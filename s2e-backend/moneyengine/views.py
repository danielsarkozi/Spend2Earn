from rest_framework import viewsets
from rest_framework import status as http_codes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.db.models import Q
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AnonymousUser
from .models import Transaction, TransactionStatusChange, Iban, Card, CustomUser, TransactionStatus
from .serializers import CustomUserSerializer, TransactionSerializer, TransactionStatusChangeSerializer, IbanSerializer, CardSerializer, CreateTransactionSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        if not self.request.user.is_anonymous:
            return [self.request.user,]
        else:
            return []


class IbanViewSet(viewsets.ModelViewSet):
    queryset = Iban.objects.all()
    serializer_class = IbanSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Iban.objects.filter(owner=self.request.user)

    def create(self, request):
        serializer = IbanSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user_in_token = request.user
            user_as_owner = serializer.validated_data['owner']            
            # only the owner user should be able to add an iban
            if user_in_token.id == user_as_owner.id:
                serializer.save()
                return Response(serializer.data, status=http_codes.HTTP_201_CREATED)
            else:
                return Response("Authenticated user is not the same as the requested owner.", status=http_codes.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=http_codes.HTTP_400_BAD_REQUEST)           


class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all().order_by('number')
    serializer_class = CardSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
            users_ibans = Iban.objects.filter(owner=self.request.user.id)
            return Card.objects.filter(iban__in=users_ibans)

    def create(self, request):        
        serializer = CardSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user_in_token = request.user
            user_as_owner = serializer.validated_data['iban'].owner            
            # only the owner user should be able to add a card
            if user_in_token.id == user_as_owner.id:
                serializer.save()
                return Response(serializer.data, status=http_codes.HTTP_201_CREATED)
            else:
                return Response("Authenticated user is not the same as the requested owner.", status=http_codes.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=http_codes.HTTP_400_BAD_REQUEST)


class TransactionViewSet(viewsets.ViewSet):
    queryset = Transaction.objects.all().order_by('id')
    serializer_class = CreateTransactionSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        filter_type = self.request.query_params.get('role', None)
        users_ibans = Iban.objects.filter(owner=self.request.user.id)
        if filter_type == "payee":
            return Transaction.objects.filter(destination_iban__in=users_ibans)
        elif filter_type == "payer":
            return Transaction.objects.filter(source_iban__in=users_ibans)
        else:
            return Transaction.objects.filter(Q(source_iban__in=users_ibans) | Q(destination_iban__in=users_ibans))

    def list(self, request):
        ret = []

        for transaction in self.get_queryset():
            d = transaction.__dict__
            del d['_state']
            d['status'] = transaction.status
            d['last_changed'] = transaction.last_changed
            ret.append(d)

        return Response(ret)
    def create(self, request):
        serializer = CreateTransactionSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response(serializer.errors, status=http_codes.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        if data["is_pos"]:
            # this is the case when the card is not registered in our system
            return Response("OK this was a regular POS transaction", status=http_codes.HTTP_200_OK)

        transaction = serializer.save()
        return Response(serializer.data, status=http_codes.HTTP_201_CREATED)  


class TransactionStatusChangeViewSet(viewsets.ModelViewSet):
    queryset = TransactionStatusChange.objects.all().order_by('timestamp')
    serializer_class = TransactionStatusChangeSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        if 'transaction_id' not in self.request.data:
            return []
        else:
            transaction = Transaction.objects.get(id=self.request.data['transaction_id'])
            if self.request.user != transaction.source_iban.owner and self.request.user != transaction.destination_iban.owner:
                return []
            return [TransactionStatusChange.objects.filter(subject_transaction=transaction).latest('timestamp'),]

    def create(self, request):
        if 'pin' not in request.headers:
            return Response("pin required", status=http_codes.HTTP_401_UNAUTHORIZED)
        serializer = TransactionStatusChangeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            requested_status = serializer.validated_data['new_status']
            if requested_status != TransactionStatus.denied_by_payer.value and requested_status != TransactionStatus.approved_by_payer.value:
                return Response("only payer approvement / deniement should be requested here", status=http_codes.HTTP_400_BAD_REQUEST)                

            transaction = serializer.validated_data['subject_transaction']
            payer_user_id_in_transaction = transaction.source_iban.owner.id
            user_in_token = request.user
            some_salt = 's2e-backend-special-high-mountain-salt'
            pin_in_request_hashed = make_password(request.headers['pin'], some_salt)   
            if (payer_user_id_in_transaction != user_in_token.id or pin_in_request_hashed != user_in_token.pin):
                return Response("User id or pin mismatch", status=http_codes.HTTP_401_UNAUTHORIZED)

            transaction.updateStatus(requested_status)
            return Response(transaction.makePayment(), status=http_codes.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=http_codes.HTTP_400_BAD_REQUEST)

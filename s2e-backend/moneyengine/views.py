from rest_framework import viewsets
from rest_framework import status as http_codes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password
from .models import Transaction, TransactionStatusChange, Iban, Card, CustomUser, TransactionStatus
from .serializers import CustomUserSerializer, TransactionSerializer, TransactionStatusChangeSerializer, IbanSerializer, CardSerializer
from .payment import PaymentIban


class RegistrationView(APIView):
    # no authentication required, GET method not allowed

    @classmethod
    def get_extra_actions(cls):
        return []
    def post(self, request):        
        serializer = CustomUserSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=http_codes.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=http_codes.HTTP_400_BAD_REQUEST)


class UserDataView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        if request.user.is_authenticated: # only returns true if a valid token was given
            serializer = CustomUserSerializer(request.user, context={'request': request})
            return Response(serializer.data, status=http_codes.HTTP_201_CREATED)
        else:
            return Response("Invalid authentication token", status=http_codes.HTTP_401_UNAUTHORIZED)


class IbanView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        if request.user.is_authenticated: # only returns true if a valid token was given
            users_ibans = Iban.objects.filter(owner=request.user)
            serializer = IbanSerializer(users_ibans, many=True, context={'request': request})
            return Response(serializer.data, status=http_codes.HTTP_201_CREATED)
        else:
            return Response("Invalid authentication token", status=http_codes.HTTP_401_UNAUTHORIZED)

    def post(self, request):
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


class CardView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        if request.user.is_authenticated: # only returns true if a valid token was given
            users_ibans = Iban.objects.filter(owner=request.user)
            users_cards = Card.objects.filter(iban_in=users_ibans)
            serializer = CardSerializer(users_cards, many=True, context={'request': request})
            return Response(serializer.data, status=http_codes.HTTP_201_CREATED)
        else:
            return Response("Invalid authentication token", status=http_codes.HTTP_401_UNAUTHORIZED)

    def post(self, request):        
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


class CreateTransactionView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        if 'source_card' in request.data:
            if Card.objects.all().filter(pk=request.data['source_card']).exists():
                request_data['source_iban'] = request.data['source_card'].Iban
                del request.data['source_card']
            else:
                # this is the case when the card is not registered in our system
                return Response("OK this was a regular POS transaction", status=http_codes.HTTP_200_OK)

        # now we have a regular Iban - Iban Transaction
        serializer = TransactionSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user_in_token = request.user
            user_in_destination = serializer.validated_data['destination_iban'].owner

            if user_in_token.id != user_in_destination.id:
                return Response("Authenticated user is not the same as the requested receiver.", status=http_codes.HTTP_401_UNAUTHORIZED)
            else:
                p = PaymentIban.create(serializer.validated_data['source_iban'], \
                    serializer.validated_data['destination_iban'], \
                    serializer.validated_data['amount'], \
                    serializer.validated_data['savings'])
                return Response(p.transaction.transaction_id, status=http_codes.HTTP_201_CREATED)  
        else:
            return Response(serializer.errors, status=http_codes.HTTP_400_BAD_REQUEST)


class SpendingsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        if request.user.is_authenticated: # only returns true if a valid token was given
            users_ibans = Iban.objects.filter(owner=request.user)
            transactions = Transaction.objects.filter(source_iban_in=users_ibans)
            serializer = TransactionSerializer(transactions, many=True, context={'request': request})
            return Response(serializer.data, status=http_codes.HTTP_201_CREATED)
        else:
            return Response("Invalid authentication token", status=http_codes.HTTP_401_UNAUTHORIZED)


class EarningsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        if request.user.is_authenticated: # only returns true if a valid token was given
            users_ibans = Iban.objects.filter(owner=request.user)
            transactions = Transaction.objects.filter(destination_iban_in=users_ibans)
            serializer = TransactionSerializer(transactions, many=True, context={'request': request})
            return Response(serializer.data, status=http_codes.HTTP_201_CREATED)
        else:
            return Response("Invalid authentication token", status=http_codes.HTTP_401_UNAUTHORIZED)


class ValidatePayerView(APIView):
    def post(self, request):
        if 'pin' not in request.headers:
            return Response("pin required", status=status.HTTP_400_BAD_REQUEST)
        serializer = TransactionStatusChangeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            requested_status = request.data['new_status']
            if requested_status != TransactionStatus.denied_by_payer.value and requested_status != TransactionStatus.approved_by_payer.value:
                return Response("only payer approvement / deniement should be requested here", status=http_codes.HTTP_400_BAD_REQUEST)                
            
            transaction = Transaction.objects.get(transaction_id = request.data['subject_transaction'])
            payer_user_id_in_transaction = transaction.source_iban.owner.id
            user_in_token = request.user
            some_salt = 's2e-backend-special-high-mountain-salt'
            pin_in_request_hashed = make_password(request.headers['pin'], some_salt)   
            if (payer_user_id_in_transaction != user_in_token.id or pin_in_request_hashed != user_in_token.pin):
                return Response("User id or pin mismatch", status=http_codes.HTTP_401_UNAUTHORIZED)

            p = PaymentIban(transaction)
            p.updateStatus(TransactionStatus(requested_status))
            return Response(p.makePayment(), status=http_codes.HTTP_201_CREATED)

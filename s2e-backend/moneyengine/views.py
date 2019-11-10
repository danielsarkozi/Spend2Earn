from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from .payment import PaymentIban
from . import models
from . import serializers

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.CustomUserSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = models.Transaction.objects.all().order_by('transaction_id')
    serializer_class = serializers.TransactionSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        serializer = serializers.TransactionSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user_in_token = request.user
            user_in_destination = serializer.validated_data['destination_iban'].owner
            # only the destination user should be ableto request a transaction
            if user_in_token.id == user_in_destination.id:
                p = PaymentIban(serializer.validated_data['source_iban'], serializer.validated_data['destination_iban'], serializer.validated_data['amount'])
                return Response(p.transaction.transaction_id, status=status.HTTP_201_CREATED)
            else:
                return Response("Authenticated user is not the same as destination iban's owner.", status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TransactionStatusChangeViewSet(viewsets.ModelViewSet):
    queryset = models.TransactionStatusChange.objects.all().order_by('timestamp')
    serializer_class = serializers.TransactionStatusChangeSerializer
    permission_classes = (IsAuthenticated,)    

    def create(self, request):

        serializer = serializers.TransactionStatusChangeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            requested_status = serializer.validated_data['new_status']
            print(requested_status)
            print(models.Status.denied_by_payer)
            if requested_status == models.Status.denied_by_payer or requested_status == models.Status.approved_by_payer:

                payer_user_id_in_transaction = serializer.validated_data['subject_transaction'].source_iban.owner.id
                user_in_token = request.user
                some_salt = 's2e-backend-special-high-mountain-salt'
                pin_in_request_hashed = '' # ugly
                if 'pin' in request.headers:
                    pin_in_request_hashed = make_password(request.headers['pin'], some_salt)                
                if (payer_user_id_in_transaction == user_in_token.id and pin_in_request_hashed == user_in_token.pin):
                    p = PaymentIban(None, None, None, serializer.validated_data['subject_transaction'])
                    p.updateStatus(requested_status)
                    # ugly, we make the payment any way, it will eb denied if user did not approve
                    return Response(p.makePayment(), status=status.HTTP_201_CREATED)
                else:
                    return Response("User id or pin mismatch", status=status.HTTP_401_UNAUTHORIZED)

            else:
                return Response("only payer approvement / deniement should be requested here", status=status.HTTP_400_BAD_REQUEST)                
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IbanViewSet(viewsets.ModelViewSet):
    queryset = models.Iban.objects.all().order_by('iban_id')
    serializer_class = serializers.IbanSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        serializer = serializers.IbanSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user_in_token = request.user
            user_as_owner = serializer.validated_data['owner']            
            # only the owner user should be able to add an iban
            if user_in_token.id == user_as_owner.id:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response("Authenticated user is not the same as the requested owner.", status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CardViewSet(viewsets.ModelViewSet):
    queryset = models.Card.objects.all().order_by('number')
    serializer_class = serializers.CardSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        serializer = serializers.CardSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user_in_token = request.user
            user_as_owner = serializer.validated_data['iban'].owner            
            # only the owner user should be able to add a card
            if user_in_token.id == user_as_owner.id:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response("Authenticated user is not the same as the requested owner.", status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
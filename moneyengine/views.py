from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from . import models
from . import serializers

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.CustomUserSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = models.Transaction.objects.all().order_by('transaction_id')
    serializer_class = serializers.TransactionSerializer
    # permission_classes = (IsAuthenticated,)

class TransactionStatusChangeViewSet(viewsets.ModelViewSet):
    queryset = models.TransactionStatusChange.objects.all().order_by('timestamp')
    serializer_class = serializers.TransactionStatusChangeSerializer
    permission_classes = (IsAuthenticated,)    

    def create(self, request):

        serializer = serializers.TransactionStatusChangeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():

            requested_status = serializer.validated_data['new_status']
            if requested_status == "denied_by_payer" or requested_status == 'approved_by_payer':

                payer_user_id_in_transaction = serializer.validated_data['subject_transaction'].source_iban.owner.id
                user_in_token = request.user
                some_salt = 's2e-backend-special-high-mountain-salt' 
                pin_in_request_hashed = make_password(request.headers['pin'], some_salt)
                if (payer_user_id_in_transaction == user_in_token.id and pin_in_request_hashed == user_in_token.pin):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response("User id or pin mismatch", status=status.HTTP_401_UNAUTHORIZED)

            else:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
                
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IbanViewSet(viewsets.ModelViewSet):
    queryset = models.Iban.objects.all().order_by('iban_id')
    serializer_class = serializers.IbanSerializer
    # permission_classes = (IsAuthenticated,)

class CardViewSet(viewsets.ModelViewSet):
    queryset = models.Card.objects.all().order_by('number')
    serializer_class = serializers.CardSerializer
    # permission_classes = (IsAuthenticated,)
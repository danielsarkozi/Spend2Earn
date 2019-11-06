from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
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
    # permission_classes = (IsAuthenticated,)    

    def create(self, request):
        serializer = serializers.TransactionStatusChangeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            str_meta = str(request.META)
            return Response(str_meta, status=status.HTTP_201_CREATED)
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
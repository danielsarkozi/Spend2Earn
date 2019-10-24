from rest_framework import serializers

from .models import Transaction, AlternativeUser, TransactionStatusChange

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = ('transaction_id', 'payee', 'payer', 'amount', 'savings', 'status')

class AlternativeUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AlternativeUser
        fields = '__all__'

class TransactionStatusChangeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TransactionStatusChange
        fields = '__all__'
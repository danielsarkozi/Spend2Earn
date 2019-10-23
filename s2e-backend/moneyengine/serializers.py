from rest_framework import serializers

from .models import Transaction, AlternativeUser

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = ('transaction_id', 'payee', 'payer', 'amount', 'savings', 'status')

class AlternativeUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AlternativeUser
        fields = '__all__'
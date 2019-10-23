from rest_framework import serializers

from .models import Transaction, User

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = ('transaction_id', 'payee', 'payer', 'amount', 'savings', 'status')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('user_id')
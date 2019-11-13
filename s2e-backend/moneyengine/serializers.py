from rest_framework import serializers
from .models import Transaction, TransactionStatusChange, Iban, Card, CustomUser, TransactionStatus

class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True)
    pin = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'pin', 'password', 'username', 'email']

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class TransactionStatusChangeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TransactionStatusChange
        fields = '__all__'

class IbanSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Iban
        fields = '__all__'

class CardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'
from rest_framework import serializers

from .models import Transaction, AlternativeUser, TransactionStatusChange, Iban, Card

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

class IbanSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Iban
        fields = '__all__'

class CardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'
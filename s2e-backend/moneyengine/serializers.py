from rest_framework import serializers

from .models import Transaction, CustomUser, TransactionStatusChange, Iban, Card

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
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
from rest_framework import serializers

from .models import Transaction, AlternativeUser, TransactionStatusChange, Iban, Card, Session

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

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

class SessionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'
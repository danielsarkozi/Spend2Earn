from rest_framework import serializers

from .models import Transaction

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = ('receiverID', 'senderID', 'amount', 'message', 'status')
from rest_framework import serializers
from .models import Transaction, TransactionStatusChange, Iban, Card, CustomUser, TransactionStatus

class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True)
    pin = serializers.CharField(write_only=True)

    # this way email and is_staff field did not get saved, but I just commented it out
    # def create(self, validated_data):
    #     user = CustomUser.objects.create(username=validated_data['username'])
    #     user.set_password(validated_data['password'])
    #     user.save()
    #     return user

    class Meta:
        model = CustomUser
        fields = ['url', 'pin', 'password', 'email', 'is_staff', 'is_superuser']

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


class CreateTransactionSerializer(serializers.Serializer):
    source_card = serializers.CharField(max_length=255, required=False)
    source_iban = serializers.CharField(max_length=255, required=False)
    destination_iban = serializers.CharField(max_length=255)
    amount = serializers.DecimalField(decimal_places=2, max_digits=14)
    savings = serializers.DecimalField(decimal_places=2, max_digits=14)
    currency = serializers.CharField(max_length=3)

    def validate(self, attrs):
        attrs["is_pos"] = False

        if 'source_card' in attrs:
            if 'source_iban' in attrs:
                raise serializers.ValidationError('source_card and source_iban cannot be both set')
            if Card.objects.all().filter(number=attrs['source_card']).exists():
                attrs["source_iban"] = Card.objects.get(number=attrs['source_card']).iban
                del attrs["source_card"]
            else:
                attrs["is_pos"] = True
        elif 'source_iban' in attrs:
            try:
                source_str = attrs['source_iban'][:-1]
                source_id = source_str[source_str.rfind('/') + 1 : ]
                attrs["source_iban"] = Iban.objects.get(id=source_id)
            except Iban.DoesNotExist:
                raise serializers.ValidationError('invalid source iban')
        else:
            raise serializers.ValidationError('source_card or source_iban is required')
        
        try:
            destination_str = attrs['destination_iban'][:-1]
            destination_id = destination_str[destination_str.rfind('/') + 1 : ]
            attrs["destination_iban"] = Iban.objects.get(id=destination_id)
        except Iban.DoesNotExist:
            raise serializers.ValidationError('invalid destination iban')

        if 'source_iban' in attrs and attrs['source_iban'] == attrs['destination_iban']:
            raise serializers.ValidationError('source_iban and destination_iban cannot be the same')

        user_in_token = self.context["request"].user
        user_in_destination = attrs["destination_iban"].owner

        if user_in_token.id != user_in_destination.id:
            raise serializers.ValidationError('Authenticated user is not the same as the requested receiver.')
        return attrs

    def create(self, validated_attrs):
        if validated_attrs["is_pos"]:
            raise NotImplementedError("can't create POS transaction")

        return Transaction.objects.createTransaction(
            validated_attrs["source_iban"],
            validated_attrs["destination_iban"],
            validated_attrs["amount"],
            validated_attrs["savings"],
            validated_attrs["currency"]
        )

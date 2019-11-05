from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Transaction, TransactionStatusChange, Iban, Card, Profile

class ProfileSerializer(serializers.ModelSerializer):
    pin = serializers.IntegerField()

    class Meta:
        model = Profile
        fields = ('pin',)

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username', 'password', 'userprofile')


    def create(self, validated_data, instance=None):
        profile_data = validated_data.pop('userprofile')
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        Profile.objects.update_or_create(user=user,**profile_data)
     

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

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
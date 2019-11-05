from rest_framework import viewsets
from django.contrib.auth.models import User

from . import serializers
from . import models

class UserViewSet(viewsets.ModelViewSet):
    def profile(self, request):
        u = User.objects.filter(pk=request.user.pk)[0]
        p = Profile.objects.filter(user=u)[0]
        return Response({"id": u.id, "first_name": u.first_name, "last_name": u.last_name, "email": u.email,
                     "city": p.city, "country": p.country, "bio": p.bio})

    queryset = User.objects.all()
    serializer_class = UserSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = models.Transaction.objects.all().order_by('transaction_id')
    serializer_class = serializers.TransactionSerializer

    def partial_update(self, transaction, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(transaction, *args, **kwargs)

class TransactionStatusChangeViewSet(viewsets.ModelViewSet):
    queryset = models.TransactionStatusChange.objects.all().order_by('timestamp')
    serializer_class = serializers.TransactionStatusChangeSerializer

    def partial_update(self, status_change, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(status_change, *args, **kwargs)

class IbanViewSet(viewsets.ModelViewSet):
    queryset = models.Iban.objects.all().order_by('iban_id')
    serializer_class = serializers.IbanSerializer

    def partial_update(self, iban, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(iban, *args, **kwargs)

class CardViewSet(viewsets.ModelViewSet):
    queryset = models.Card.objects.all().order_by('number')
    serializer_class = serializers.CardSerializer

    def partial_update(self, card, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(card, *args, **kwargs)
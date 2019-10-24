from rest_framework import viewsets

from .serializers import TransactionSerializer, AlternativeUserSerializer, TransactionStatusChangeSerializer, IbanSerializer, CardSerializer
from .models import Transaction, AlternativeUser, TransactionStatusChange, Iban, Card


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('status')
    serializer_class = TransactionSerializer

    def partial_update(self, transaction, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(transaction, *args, **kwargs)

class AlternativeUserViewSet(viewsets.ModelViewSet):
    queryset = AlternativeUser.objects.all().order_by('user_id')
    serializer_class = AlternativeUserSerializer

    def partial_update(self, alt_user, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(alt_user, *args, **kwargs)

class TransactionStatusChangeViewSet(viewsets.ModelViewSet):
    queryset = TransactionStatusChange.objects.all().order_by('timestamp')
    serializer_class = TransactionStatusChangeSerializer

    def partial_update(self, status_change, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(status_change, *args, **kwargs)

class IbanViewSet(viewsets.ModelViewSet):
    queryset = Iban.objects.all().order_by('iban_id')
    serializer_class = IbanSerializer

    def partial_update(self, iban, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(iban, *args, **kwargs)

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all().order_by('number')
    serializer_class = CardSerializer

    def partial_update(self, card, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(card, *args, **kwargs)

from rest_framework import viewsets

from .serializers import TransactionSerializer, AlternativeUserSerializer
from .models import Transaction, AlternativeUser


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
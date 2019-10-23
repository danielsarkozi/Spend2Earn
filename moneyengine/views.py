from rest_framework import viewsets

from .serializers import TransactionSerializer
from .models import Transaction


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('status')
    serializer_class = TransactionSerializer

    def partial_update(self, transaction, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(transaction, *args, **kwargs)
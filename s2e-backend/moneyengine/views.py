from rest_framework import viewsets

from .serializers import TransactionSerializer
from .models import Transaction

from .serializers import UserSerializer
from .models import User


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('status')
    serializer_class = TransactionSerializer

    def partial_update(self, transaction, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(transaction, *args, **kwargs)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('user_id')
    serializer_class = UserSerializer

    def partial_update(self, user, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(user, *args, **kwargs)
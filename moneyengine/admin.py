from django.contrib import admin
from .models import Transaction, AlternativeUser, TransactionStatusChange

admin.site.register(Transaction)
admin.site.register(AlternativeUser)
admin.site.register(TransactionStatusChange)

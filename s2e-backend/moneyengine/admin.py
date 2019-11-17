from django.contrib import admin
from .models import Transaction, TransactionStatusChange, Iban, Card, CustomUser

admin.site.register(CustomUser)
admin.site.register(Transaction)
admin.site.register(TransactionStatusChange)
admin.site.register(Iban)
admin.site.register(Card)

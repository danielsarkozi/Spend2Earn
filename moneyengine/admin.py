from django.contrib import admin
from .models import Transaction, AlternativeUser, TransactionStatusChange, Iban, Card

admin.site.register(Transaction)
admin.site.register(AlternativeUser)
admin.site.register(TransactionStatusChange)
admin.site.register(Iban)
admin.site.register(Card)
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
from enum import Enum, auto

class CustomUser(AbstractUser):
    pin = models.CharField(max_length=256, blank = True)

    def save(self, **kwargs):
        some_salt = 's2e-backend-special-high-mountain-salt' 
        self.pin = make_password(self.pin, some_salt)
        super().save(**kwargs)

class Status(Enum):
    created             = auto()
    approved_by_payer   = auto()
    denied_by_payer     = auto()
    approved_by_bank    = auto()
    denied_by_bank      = auto()

    @classmethod
    def choices( cls ):
        return tuple( ( i.name, i.value ) for i in cls )
        
class Iban(models.Model):
    iban_id = models.AutoField(primary_key=True)
    account_owner = models.CharField(max_length=255)
    alias = models.CharField(max_length=255)
    country = models.CharField(max_length=2)
    check_digit = models.CharField(max_length=2)
    bank = models.IntegerField()
    number = models.CharField(max_length=30)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.owner.username) + "'s " + self.alias + " account"

class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    source_iban = models.ForeignKey(Iban, on_delete = models.CASCADE, related_name='%(class)s_payeriban')
    destination_iban = models.ForeignKey(Iban, on_delete = models.CASCADE, related_name='%(class)s_payeeiban')
    amount = models.DecimalField(decimal_places=2, max_digits=14)
    savings = models.DecimalField(decimal_places=2, max_digits=14)

    def __str__(self):
        return str(self.transaction_id) + ": " + str(self.amount) + "$ from " + str(self.source_iban) + " to " + str(self.destination_iban)

class TransactionStatusChange(models.Model):
    subject_transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name='%(class)s_subjecttransaction')
    new_status = models.CharField(max_length=255, choices=Status.choices())
    timestamp = models.DateTimeField(auto_now=True)

class Card(models.Model):
	number = models.CharField(max_length=255)
	iban = models.ForeignKey(Iban, on_delete=models.CASCADE)

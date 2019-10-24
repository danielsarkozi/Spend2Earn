from django.db import models
from enum import Enum, auto

class Status(Enum):
    created             = auto()
    approved_by_payer   = auto()
    denied_by_payer     = auto()
    approved_by_bank    = auto()
    denied_by_bank      = auto()

    @classmethod
    def choices( cls ):
        return tuple( ( i.name, i.value ) for i in cls )

class AlternativeUser(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=255)
    password_hash = models.CharField(max_length=60)
    email = models.EmailField()
    pin_hash = models.CharField(max_length=40) #should we hash this?
    user_registration_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "(" + self.user_id + ") " + self.username

class Session(models.Model):
    session_id = models.CharField(max_length=60, primary_key=True)
    user =models.ForeignKey(AlternativeUser, on_delete=models.CASCADE, related_name='%(class)s_userofsession')

class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    payee = models.ForeignKey(AlternativeUser, on_delete = models.CASCADE, related_name='%(class)s_payee')
    payer = models.ForeignKey(AlternativeUser, on_delete = models.CASCADE, related_name='%(class)s_payer')
    amount = models.DecimalField(decimal_places=2, max_digits=14)
    savings = models.DecimalField(decimal_places=2, max_digits=14)

    def __str__(self):
        return "transaction no. " + self.transaction_id + ": " + self.amount + "$ from " + self.payer + ", to " + self.payee

class TransactionStatusChange(models.Model):
    subject_transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name='%(class)s_subjecttransaction')
    new_status = models.CharField(max_length=255, choices=Status.choices())
    timestamp = models.DateTimeField(auto_now=True)

class Iban(models.Model):
	iban_id = models.AutoField(primary_key=True)
	account_owner = models.CharField(max_length=255)
	alias = models.CharField(max_length=255)
	country = models.CharField(max_length=2)
	check_digit = models.CharField(max_length=2)
	bank = models.IntegerField()
	number = models.CharField(max_length=30)
	owner = models.ForeignKey(AlternativeUser, on_delete=models.CASCADE)

class Card(models.Model):
	number = models.CharField(max_length=255)
	iban = models.ForeignKey(Iban, on_delete=models.CASCADE)

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
from django.utils.translation import ugettext_lazy as _
from enum import Enum, auto
import random

class TransactionManager(models.Manager):
    def createTransaction(self, source_iban, destination_iban, amount, savings, currency):
        transaction = self.create(
            source_iban=source_iban,
            destination_iban=destination_iban,
            amount=amount,
            savings=savings,
            currency=currency
        )
        transaction.updateStatus(TransactionStatus.created.value)
        return transaction

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    pin = models.CharField(max_length=256, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def save(self, **kwargs):
        some_salt = 's2e-backend-special-high-mountain-salt' 
        self.pin = make_password(self.pin, some_salt)
        self.set_password(self.password)
        super().save(**kwargs)

class TransactionStatus(Enum):
    created             = "created"
    approved_by_payer   = "approved_by_payer"
    denied_by_payer     = "denied_by_payer"
    approved_by_bank    = "approved_by_bank"
    denied_by_bank      = "denied_by_bank"

    @classmethod
    def choices( cls ):
        return tuple( ( i.name, i.value ) for i in cls )
        
class Iban(models.Model):
    account_owner = models.CharField(max_length=255)
    alias = models.CharField(max_length=255)
    check_digit = models.CharField(max_length=2)
    country = models.CharField(max_length=2)
    number = models.CharField(max_length=30)
    currency = models.CharField(max_length=3)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id) + ": " + str(self.owner.email) + "'s " + self.alias + " account"

class Transaction(models.Model):
    source_iban = models.ForeignKey(Iban, on_delete = models.CASCADE, related_name='%(class)s_payeriban')
    destination_iban = models.ForeignKey(Iban, on_delete = models.CASCADE, related_name='%(class)s_payeeiban')
    amount = models.DecimalField(decimal_places=2, max_digits=14)
    savings = models.DecimalField(decimal_places=2, max_digits=14)
    currency = models.CharField(max_length=3)

    objects = TransactionManager()

    @property
    def status(self):
        return TransactionStatusChange.objects \
            .filter(subject_transaction = self) \
            .latest().new_status

    @property
    def last_changed(self):
        return TransactionStatusChange.objects \
            .filter(subject_transaction = self) \
            .latest().timestamp

    def updateStatus(self, new_status):
        TransactionStatusChange(
            subject_transaction = self,
            new_status = new_status
        ).save()

    def makePayment(self):
        status = self.status
        # only possible if status is approved by payer, or denied by bank (try again)
        if status in {TransactionStatus.created.value, TransactionStatus.denied_by_payer.value, TransactionStatus.approved_by_bank.value}:
            # maybe we should return more than a boolean
            return False

        success = random.choices([True, False], [0.95, 0.05])[0]
        if success:
            status = TransactionStatus.approved_by_bank.value
        else:
            status = TransactionStatus.denied_by_bank.value

        TransactionStatusChange(
            subject_transaction = self,
            new_status = status
        ).save()

        return success

    def __str__(self):
        return str(self.id) + ": " + str(self.amount) + " " + self.currency + " from " + str(self.source_iban) + " to " + str(self.destination_iban)

class TransactionStatusChange(models.Model):
    subject_transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name='%(class)s_subjecttransaction')
    new_status = models.CharField(max_length=255, choices=TransactionStatus.choices())
    timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        get_latest_by = 'timestamp'

class Card(models.Model):
    number = models.CharField(max_length=255)
    alias = models.CharField(max_length=255)
    iban = models.ForeignKey(Iban, on_delete=models.CASCADE)

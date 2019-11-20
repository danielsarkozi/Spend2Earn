from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
from enum import Enum, auto

class TransactionManager(models.Manager):
    def createTransaction(self, source_iban, destination_iban, amount, savings):
        transaction = self.create(
            source_iban=source_iban,
            destination_iban=destination_iban,
            amount=amount,
            savings=savings
        )
        transaction.updateStatus(TransactionStatus.created)
        return transaction

class CustomUser(AbstractUser):
    pin = models.CharField(max_length=256, blank=True)

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
    country = models.CharField(max_length=2)
    check_digit = models.CharField(max_length=2)
    bank = models.IntegerField()
    number = models.CharField(max_length=30)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id) + ": " + str(self.owner.username) + "'s " + self.alias + " account"

class Transaction(models.Model):
    source_iban = models.ForeignKey(Iban, on_delete = models.CASCADE, related_name='%(class)s_payeriban')
    destination_iban = models.ForeignKey(Iban, on_delete = models.CASCADE, related_name='%(class)s_payeeiban')
    amount = models.DecimalField(decimal_places=2, max_digits=14)
    savings = models.DecimalField(decimal_places=2, max_digits=14)

    objects = TransactionManager()

    @property
    def status(self):
        return TransactionStatusChange.objects \
            .filter(subject_transaction = self) \
            .latest().new_status

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
            status = TransactionStatus.approved_by_bank
        else:
            status = TransactionStatus.denied_by_bank

        TransactionStatusChange(
            subject_transaction = self,
            new_status = status
        ).save()

    def __str__(self):
        return str(self.id) + ": " + str(self.amount) + "$ from " + str(self.source_iban) + " to " + str(self.destination_iban)

class TransactionStatusChange(models.Model):
    subject_transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name='%(class)s_subjecttransaction')
    new_status = models.CharField(max_length=255, choices=TransactionStatus.choices())
    timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        get_latest_by = 'timestamp'

class Card(models.Model):
	number = models.CharField(max_length=255)
	iban = models.ForeignKey(Iban, on_delete=models.CASCADE)

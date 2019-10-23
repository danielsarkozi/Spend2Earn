from django.db import models
from enum import Enum, auto

class User(models.Model):
    user_id = models.AutoField(primary_key=True)

class Status(Enum):
    created             = auto()
    approved_by_payer   = auto()
    denied_by_payer     = auto()
    approved_by_bank    = auto()
    denied_by_bank      = auto()

    @classmethod
    def choices( cls ):
        return tuple( ( i.name, i.value ) for i in cls )

class Transaction(models.Model):
    '''
    receiverID = models.IntegerField()
    senderID = models.IntegerField()
    amount = models.IntegerField()
    message = models.CharField(max_length=110)
    status = models.CharField(max_length=20)

    '''
    transaction_id = models.AutoField(primary_key=True)
    payee = models.ForeignKey(User, on_delete = models.CASCADE)
    payer = models.ForeignKey(User, on_delete = models.CASCADE)
    amount = models.PositiveIntegerField()
    savings = models.PositiveIntegerField()
    status = payer = models.CharField( choices=Status.choices() )

    def __str__(self):
        pass
        #return self.status + ": " + self.amount + "$ from " + self.receiverID + ", to " + self.senderID



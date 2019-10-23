from django.db import models

class Transaction(models.Model):
    receiverID = models.IntegerField()
    senderID = models.IntegerField()
    amount = models.IntegerField()
    message = models.CharField(max_length=110)
    status = models.CharField(max_length=20)

    def __str__(self):
        return self.status + ": " + amount + "$ from " + self.receiverID + ", to " + self.senderID
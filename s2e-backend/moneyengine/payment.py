import random
from .models import Transaction, TransactionStatusChange, Iban, Status

class PaymentIban:
    def create(source_iban, destination_iban, amount):
        if amount < 0:
            raise Exception("amount must be nonnegative")

        transaction = Transaction(
            source_iban = source_iban,
            destination_iban = destination_iban,
            amount = amount,
            savings = 0
        )
        transaction.save()

        TransactionStatusChange(
            subject_transaction = transaction,
            new_status = Status.created
        ).save()

        return PaymentIban(transaction)

    def __init__(self, transaction):
        self.transaction = transaction

    def status(self):
        return TransactionStatusChange.objects \
            .filter(subject_transaction = self.transaction) \
            .latest('timestamp') \
            .new_status

    def updateStatus(self, status):
        TransactionStatusChange(
            subject_transaction = self.transaction,
            new_status = status
        ).save()

    def makePayment(self):
        status = self.status()
        if status in {Status.created, Status.denied_by_payer}:
            return False
        if status == Status.approved_by_bank:
            return False

        success = random.choices([True, False], [0.95, 0.05])[0]
        if success:
            status = Status.approved_by_bank
        else:
            status = Status.denied_by_bank

        TransactionStatusChange(
            subject_transaction = self.transaction,
            new_status = status
        ).save()

        return success
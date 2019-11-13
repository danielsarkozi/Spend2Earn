import random
from .models import Transaction, TransactionStatusChange, Iban, TransactionStatus

class PaymentIban:
    def create(source_iban, destination_iban, amount, savings):
        # "alternative constructor"
        if amount < 0:
            raise Exception("amount must be nonnegative")

        transaction = Transaction(
            source_iban = source_iban,
            destination_iban = destination_iban,
            amount = amount,
            savings = savings
        )
        transaction.save()

        TransactionStatusChange(
            subject_transaction = transaction,
            new_status = TransactionStatus.created
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
        # only possible if status is approved by payer, or denied by bank (try again)
        if status in {TransactionStatus.created, TransactionStatus.denied_by_payer, TransactionStatus.approved_by_bank}:
            # maybe we should return more than a boolean
            return False

        success = random.choices([True, False], [0.95, 0.05])[0]
        if success:
            status = TransactionStatus.approved_by_bank
        else:
            status = TransactionStatus.denied_by_bank

        TransactionStatusChange(
            subject_transaction = self.transaction,
            new_status = status
        ).save()

        return success
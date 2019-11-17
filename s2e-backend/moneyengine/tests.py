from time import sleep
from django.test import TestCase
from .models import Card, Iban, CustomUser, Status
from .payment import Payment

class PaymentTestCase(TestCase):
    def setUp(self):
        self.user1 = CustomUser(username="peti")
        self.user1.save()

        self.iban1 = Iban(account_owner="peti", number="1111", owner=self.user1, bank=0)
        self.iban1.save()

        card = Card(number = "1111", iban=self.iban1)
        card.save()

        self.user2 = CustomUser(username="zoli")
        self.user2.save()

        self.iban2 = Iban(account_owner="zoli", number="2222", owner=self.user2, bank=0)
        self.iban2.save()

        card = Card(number = "2222", iban=self.iban2)
        card.save()

    def testOK(self):
        p = Payment(self.iban1, self.iban2, 100000)
        self.assertEqual(p.status(), 'Status.created')

        sleep(0.01)

        while not p.validatePayer():
            self.assertEqual(p.status(), 'Status.denied_by_payer')
            sleep(0.01)
        self.assertEqual(p.status(), 'Status.approved_by_payer')

        sleep(0.01)

        while not p.makePayment():
            self.assertEqual(p.status(), 'Status.denied_by_bank')
            sleep(0.01)
        self.assertEqual(p.status(), 'Status.approved_by_bank')

    def testBadStatus(self):
        p = Payment(self.iban1, self.iban2, 100000)

        sleep(0.01)

        self.assertRaises(Exception, lambda x : p.makePayment())

        sleep(0.01)

        p.updateStatus(Status.denied_by_payer)
        self.assertRaises(Exception, lambda x : p.makePayment())

        sleep(0.01)

        p.updateStatus(Status.approved_by_bank)
        self.assertRaises(Exception, lambda x : p.makePayment())

    def testBadAmount(self):
        self.assertRaises(Exception, lambda x : Payment(self.iban1, self.iban2, -999999))
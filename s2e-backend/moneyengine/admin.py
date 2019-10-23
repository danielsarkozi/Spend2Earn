from django.contrib import admin
from .models import Transaction
from .models import User

admin.site.register(Transaction)
admin.site.register(User)

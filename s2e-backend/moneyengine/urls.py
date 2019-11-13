from django.urls import include, path
from rest_framework import routers
from .views import CustomUserView, IbanView, CardView, CreateTransactionView, SpendingsView, EarningsView, ValidatePayerView

router = routers.DefaultRouter()

urlpatterns = [
    path(r'', include(router.urls)),
    path('ibans/', IbanView.as_view()),
    path('cards/', CardView.as_view()),
    path('transactions/', CreateTransactionView.as_view()),
    path('transactions/validate/', ValidatePayerView.as_view()),
    path('transactions/myearnings/', EarningsView.as_view()),
    path('transactions/myspendings/', SpendingsView.as_view()),
]
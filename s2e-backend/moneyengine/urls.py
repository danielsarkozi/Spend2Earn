from django.urls import include, path
from rest_framework import routers
from .views import CustomUserViewSet, IbanViewSet, CardViewSet, TransactionViewSet, TransactionStatusChangeViewSet

router = routers.DefaultRouter()
router.register(r'customusers', CustomUserViewSet)
router.register(r'ibans', IbanViewSet)
router.register(r'cards', CardViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'validation', TransactionStatusChangeViewSet)

urlpatterns = [ 
    path('', include(router.urls)),
]
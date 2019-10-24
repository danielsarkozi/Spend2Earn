from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'transactions', views.TransactionViewSet)
router.register(r'alternativeusers', views.AlternativeUserViewSet)
router.register(r'transactionstatuschanges', views.TransactionStatusChangeViewSet)
router.register(r'ibans', views.IbanViewSet)
router.register(r'cards', views.CardViewSet)
router.register(r'sessions', views.SessionViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
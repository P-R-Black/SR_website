from django.urls import URLPattern, path
from . import views
from django.utils.translation import gettext_lazy as _


app_name = 'payments'
urlpatterns = [
    path('', views.payment_process, name='process'),
    path('create-checkout-session/', views.create_checkout_session, name='create-checkout-session'),
    path('config/', views.stripe_config, name='config'),
    path('done/', views.payment_done, name='done'),
    path('canceled/', views.payment_canceled, name='canceled'),
]
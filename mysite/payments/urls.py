from django.urls import URLPattern, path
from . import views

app_name = 'payments'
urlpatterns = [
    path('', views.payment_process, name='process'),
    path('start_order/', views.start_order, name='start_order'),
    path('done/', views.payment_done, name='done'),
    path('canceled/', views.payment_canceled, name='canceled'),
]

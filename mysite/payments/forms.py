from django import forms
from orders.models import Order

class CreateOrderForms(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['first_name', 'last_name', 'email']
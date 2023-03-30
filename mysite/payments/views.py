import mimetypes
from pyexpat import model
import re
from django.forms import FilePathField
from django.http import FileResponse, StreamingHttpResponse
from django.shortcuts import render, redirect, get_object_or_404
import stripe
from django.conf import settings
from cart.views import cart_detail
from orders.models import Order, OrderItem
from django.urls import reverse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import TemplateView
from payments.forms import CreateOrderForms
from orders.forms import OrderCreateForm
from cart.cart import Cart
from orders.tasks import order_created
import json
from store.models import Product
from django.core.mail import EmailMessage
from django.template.loader import render_to_string



# Create your views here.
@csrf_exempt
def start_order(request):
    cart = Cart(request)
    data = json.loads(request.body)
    total_price = 0
    items = []
    

    for item in cart: 
        product = item['product']
        total_price += product.price * int(item['quantity'])

        obj = {
            'price_data': {
                'currency': 'usd',
                'product_data': {
                    'name': product.name,
                },
                'unit_amount': int(product.price * 100),
            },
            'quantity': item['quantity']
        }

        items.append(obj)
    
    stripe.api_key = settings.STRIPE_SECRET_KEY
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=items,
        mode='payment',
        success_url='http://localhost:8000/payments/done',
        cancel_url='http://localhost:8000/payments/cancel'
    )

    payment_intent = session.payment_intent
    
    first_name = data['first_name']
    last_name = data['last_name']
    email = data['email']

    order = Order.objects.create(first_name=first_name, last_name=last_name, email=email)
    order.payment_intent = payment_intent
    order.paid_amount = total_price
    order.paid  = True
    order.save()

    for item in cart:
        product = item['product']
        quantity = int(item['quantity'])
        price = product.price * quantity

        item = OrderItem.objects.create(order=order, product=product, price=price, quantity=quantity)
    

    return JsonResponse({'session': session, 'payments': payment_intent})


def payment_process(request):
    pub_key = settings.STRIPE_PUBLIC_KEY 
    return render(request, 'payments/process.html', {'pub_key': pub_key})


def payment_canceled(request):
    return render(request, 'payments/canceled.html')


def payment_done(request):
    cart = Cart(request)

    order = Order.objects.values()
    current_order = order[0]
    first_name = current_order['first_name']
    email = current_order['email']

    products = {}
    for c in cart:
        product = c['product']
        price = c['price']

        products[product] = price

    purchased_products = products

    for product in purchased_products:
        file = product.pdf_file.url
        
        template = render_to_string('payments/email_template.html', {'name': first_name, 'file': file})

        email = EmailMessage(
            'Thank You!',
            template,
            settings.EMAIL_HOST_USER,
            [email],
        )

        email.fail_silently=False
        email.send()

    cart.clear()
    return render(request, 'payments/done.html', {'products':purchased_products})

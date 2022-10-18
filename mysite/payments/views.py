from django.shortcuts import render, redirect, get_object_or_404
import stripe
from django.conf import settings
from orders.models import Order, OrderItem
from django.urls import reverse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import TemplateView
from .forms import OrderCreateForm
from cart.cart import Cart


# Create your views here.
@csrf_exempt
def stripe_config(request):
    if request.method == 'GET':
        stripe_config = {'publicKey': settings.STRIPE_PUBLIC_KEY}
        return JsonResponse(stripe_config, safe=False)


@csrf_exempt
def create_checkout_session(request):
    order_id = request.session.get('order_id', None)
    print(f'order_id: {order_id}')
    the_orders = get_object_or_404(Order, id=order_id)
    print(f'order: {the_orders}')
    total_cost = the_orders.get_total_cost() * 100
    print(f'total cost: {total_cost}')




    
    if request.method == 'GET':
        domain_url = 'http://localhost:8000/'
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
            # Create new Checkout Session for the order
            # Other optional params include:
            # [billing_address_collection] - to display billing address details on the page
            # [customer] - if you have an existing Stripe Customer ID
            # [payment_intent_data] - capture the payment later
            # [customer_email] - prefill the email input in the form
            # For full details see https://stripe.com/docs/api/checkout/sessions/create

            # ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
            checkout_session = stripe.checkout.Session.create(
                success_url=domain_url + 'done/',
                cancel_url=domain_url + 'canceled/',
                payment_method_types=['card'],
                mode='payment',
                line_items=[
                    {
                        'name': order_id,
                        'quantity': 1,
                        'currency': 'usd',
                        'amount': int(total_cost),
                    }
                ]
            )
            return JsonResponse({'sessionId': checkout_session['id']})
        except Exception as e:
            return JsonResponse({'error': str(e)})


def payment_process(request):
    return render(request, 'payments/process.html')

def payment_done(request):
    return render(request, 'payments/done.html')


def payment_canceled(request):
    return render(request, 'payments/canceled.html')
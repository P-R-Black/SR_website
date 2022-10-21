import re
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



# @csrf_exempt
# def stripe_config(request):
#     if request.method == 'GET':
#         stripe_config = {'publicKey': settings.STRIPE_PUBLIC_KEY}
#         return JsonResponse(stripe_config, safe=False)


# @csrf_exempt
# def create_checkout_session(request):
#     order_id = request.session.get('order_id', None)
#     print(f'order_id: {order_id}')
#     the_orders = get_object_or_404(Order, id=order_id)
#     print(f'order: {the_orders}')
#     total_cost = the_orders.get_total_cost() * 100
#     print(f'total cost: {total_cost}')
    

#     cart = Cart(request)
#     # print(f'cart: {cart}')
#     # attributes = dir(cart)
#     # print(f'attributes: {attributes}')
#     # print(f'cart session: {cart.session}')

#     order = Order(request)
#     print(f'attributes Order: {dir(order)}')
#     print(f'order_items: {order.items}')
#     # print(f'order_objects: {order.objects}')
#     print(f'order_pk: {order.pk}')
#     #print(f'order_id: {order.id}')


#     for item in cart:
#         products = item['product']
#         product_two = item.product.name
#         print(f'product: {products}')
#         print(f'product: {product_two}')




#     if request.method == 'GET':
#         domain_url = 'http://localhost:8000/'
#         stripe.api_key = settings.STRIPE_SECRET_KEY
#         try:
#             # Create new Checkout Session for the order
#             # Other optional params include:
#             # [billing_address_collection] - to display billing address details on the page
#             # [customer] - if you have an existing Stripe Customer ID
#             # [payment_intent_data] - capture the payment later
#             # [customer_email] - prefill the email input in the form
#             # For full details see https://stripe.com/docs/api/checkout/sessions/create

#             # ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
#             checkout_session = stripe.checkout.Session.create(
#                 success_url=domain_url + 'done/',
#                 cancel_url=domain_url + 'canceled/',
#                 payment_method_types=['card'],
#                 mode='payment',
#                 line_items=[
#                     {
#                         'name': order_id,
#                         'quantity': 1,
#                         'currency': 'usd',
#                         'amount': int(total_cost),
#                     }
#                 ]
#             )
#             return JsonResponse({'sessionId': checkout_session['id']})
#         except Exception as e:
#             return JsonResponse({'error': str(e)})


# def payment_process(request):
#     return render(request, 'payments/process.html')

def payment_done(request):
    return render(request, 'payments/done.html')

def payment_canceled(request):
    return render(request, 'payments/canceled.html')


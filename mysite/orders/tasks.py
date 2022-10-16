from celery import shared_task
from django.core.mail import send_mail
from .models import Order
from celery import Celery

@shared_task
def order_created(order_id):
    """
    Task to send an e-mail notification when an order is successfully created.
    """

    order = Order.objects.get(id=order_id)
    subject = f'Order nr. {order.id}'
    message = f'Dear {order.first_name}\n\n You have successfully placed an order. Your order ID is {order.id}.\nThanks for supporting The Seville Report.\n\nSincerely\nPaul'



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
    subject = f'Order No. {order.id}'
    message = f'Dear {order.first_name}\n\n Thank you for checking out The Seville Report. Your order ID is {order.id}.\nThanks for supporting The Seville Report.\n\nSincerely\nPaul'

    mail_sent = send_mail(subject, message, 'pblack@sevillereport.com', [order.email])

    return mail_sent



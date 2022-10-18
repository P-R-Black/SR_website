from django.db import models
from store import models as product_models
from django.conf import settings


# Create your models here.
class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, blank=False, on_delete=models.CASCADE)
    crated_at = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        get_latest_by = 'created_at'

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, blank=False, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(product_models.Product, blank=False, on_delete=models.CASCADE, related_name='cart_product')
    quantity = models.IntegerField(null=False, blank=False)
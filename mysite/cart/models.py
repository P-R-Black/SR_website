# from django.db import models
# from store import Product
# from django.conf import settings


# Create your models here.
# class Cart(models.Model):
#     def __init__(self, request):
#         self.session = request.session
#         cart = self.session.get(settings.CART_SESSION_ID)


#         if not cart:
#             cart = self.session[settings.CART_SESSION_ID] = {}
        
#         self.cart = cart
    
#     def __iter__(self):
#         for p in self.cart.keys():
#             self.cart[str(p)]['product'] = Product.objects.get(pk=p)
    

#     def __len__(self):
#         return sum(item['quantity'] for item in self.cart.values())
    
#     def save(self):
#         self.session[settings.CART_SESSION_ID] = self.cart
#         self.session.modified = True
    

#     def add(self, product_id, quantity=1, update_quantity=False):
#         product_id = str(product_id)

#         if product_id not in self.cart:
#             self.cart[product_id] = {'quantity': 1, 'id': product_id}

#         if update_quantity:
#             self.cart[product_id]['quantity'] += int(quantity)
        
#             if self.cart[product_id]['quantity'] == 0:
#                 self.remove(product_id)
        
#         self.save()
    
#     def remove(self, product_id):
#         if product_id in self.cart:
#             del self.cart[product_id]
#             self.save()




#     user = models.ForeignKey(settings.AUTH_USER_MODEL, blank=False, on_delete=models.CASCADE)
#     crated_at = models.DateTimeField(auto_now_add=True, editable=False)


#     class Meta:
#         get_latest_by = 'created_at'

# class CartItem(models.Model):
#     cart = models.ForeignKey(Cart, blank=False, on_delete=models.CASCADE, related_name='cart_items')
#     product = models.ForeignKey(product_models.Product, blank=False, on_delete=models.CASCADE, related_name='cart_product')
#     quantity = models.IntegerField(null=False, blank=False)
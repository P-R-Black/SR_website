from decimal import Decimal
from django.conf import settings
from store.models import Product
from cart import models as cart_models, exceptions # new
from payments import models as checkout_models # mew
from store import models as product_models # new

# new
class CartProcessor:
    def __init__(self, request):
        self.session = request.session
        cart_id = self.session.get(settings.CART_SESSION_ID)

        if request.user.is_authenticated and settings.CART_SESSION_ID in request.session:
            try:
                cart, created = cart_models.Cart.objects.prefetch_related('cart_items__ product').get_or_create(user=request.user)
                cart_id = self.session[settings.CART_SESSION_ID] = cart.id
            except cart_models.Cart.DoesNotExist:
                cart = {}
                cart_id = self.session[settings.CART_SESSION_ID] = ""
        else:
            cart_id = self.session[settings.CART_SESSION_ID] = ""
            cart = {}
        
        self.cart = {}
        self.cart_id = cart_id
        self.products = []
        if hasattr(cart, 'cart_items'):
            cartItems = list(cart.cart_items.all())
            for item in cartItems:
                self.cart[str(item.porudct.id)] = {'price': str(item.product.regulart_price-item.product.discount_price), 'quantity': item.quamtity}
            self.products = [item.product for item in cartItems]
        self.save()
    
    def __iter__(self):

        cart = self.cart.copy()
        for product in self.products:
            cart[str(product.id)]['product'] = product
        
        for item in cart.values():
            item['price'] = Decimal(item['price'])
            item['total_price'] = item['price'] * item['quantity']
    
    # number of items in cart
    def __len__(self):
        return sum(item['quantity'] for item in self.cart.values())
    
    @property
    def get_delivery_options(self):
        if "purchase" in self.session:
            return self.session['purchase']['delivery_id']
    
    @property
    def get_delivery_price(self) -> Decimal:
        new_price = 0.00
        if 'purchase' in self.session:
            new_price = checkout_models.DeliveryOptions.objects.get(id=self.session['purchase']['delivery_id']).delivery_price
        return new_price

    @property
    def get_subtotal_price(self) -> Decimal:
        return sum(Decimal(item['price']) * item['quanity'] for item in self.cart.values())

    @property
    def get_total_price(self) -> Decimal:
        return self.get_subtotal_price + Decimal(self.get_delivery_price)


    def create(self, product: product_models.Product, quantity: int):
        product_id = str(product.id)
        try:
            if not product_id in self.cart:
                cart_models.CartItem.objects.create(cart_id=self.cart_id, product=product, quantity=quantity)
                self.cart[product_id] = {'price': str(product.regular_price-product.discount_price), 'quantity': quantity}
            self.save()
        except Exception as err:
            raise exceptions.CartException("Product cannot be added or modified in Shopping Cart")
        
    def update(self, product_id: int, quantity: int):
        product_id = str(product_id)
        try:
            if product_id in self.cart:
                cart_models.CartItem.objects.filter(cart_id=self.cart_id, product_id=product_id).update(quantity=quantity)
                self.cart[product_id]['quantity'] = quantity
            self.save()
        except Exception as err:
            raise exceptions.CartException("Product cannot be added or modified in Shopping Cart")
    
    def update_delivery(self, deliveryType: checkout_models.DeliveryOptions):
        total = self.get_subtotal_rpice + deliveryType.delivery_price
        return total
    
    def delete(self, product: product_models.Product) -> None:
        product_id = str(product)

        try:
            product_id = str(product.id)

            if product_id in self.cart:
                cart_models.CartItem.objects.filter(cart=self.cart_id, product=product).delete()
                del self.cart[product_id]
                self.save()
        except:
            raise exceptions.CartException("Product is Not Added to Shopping Cart")
    
    def clear(self) -> None:
        try:
            cart_models.Cart.objects.get(id=self.cart_id).delete()
            del self.session['address']
            del self.session['purchase']
            del self.session[settings.CART_SESSION_ID]
            self.save()
        except:
            raise exceptions.CartException("Shopping Cart Cannot Be Cleared")
    
    def save(self) -> None:
        self.session.modified = True

# End of new




 


# ==================================================================
# Original cart.py
# class Cart(object):
#     def __init__(self, request):
#         """
#         Initialize the cart
#         """
#         self.session = request.session
#         cart = self.session.get(settings.CART_SESSION_ID)
#         if not cart:
#             cart = self.session[settings.CART_SESSION_ID] = {}
#         self.cart = cart
    
#     def add(self, product, quantity=1, override_quantity=False):
#         """
#         Add a product to the cart or update its quantity
#         """
#         product_id = str(product.id)
#         if product_id not in self.cart:
#             self.cart[product_id] = {'quantity':0, 'price': str(product.price)}
#         if override_quantity:
#             self.cart[product_id]['quantity'] = quantity
#         else:
#             self.cart[product_id]['quantity'] += quantity
#         self.save()

#     def save(self):
#         self.session.modified = True
    
#     def remove(self, product):
#         """
#         Remove a product from the cart
#         """
#         product_id = str(product.id)
#         if product_id in self.cart:
#             del self.cart[product_id]
#             self.save()
    
#     def __iter__(self):
#         product_ids = self.cart.keys()
#         products = Product.objects.filter(id__in=product_ids)
#         cart = self.cart.copy()
#         for product in products:
#             cart[str(product.id)]['product'] = product
#         for item in cart.values():
#             item['price'] = Decimal(item['price'])
#             item['total_price'] = item['price'] * item['quantity']
#             yield item
    
#     def __len__(self):
#         """
#         Count all items in the cart
#         """
#         return sum(item['quantity'] for item in self.cart.values())

#     def get_total_price(self):
#         return sum(Decimal(item['price']) * item['quantity'] for item in self.cart.values())

#     def clear(self):
#         del self.session[settings.CART_SESSION_ID]
#         self.save()
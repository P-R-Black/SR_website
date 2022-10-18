# from .cart import Cart
from .cart import CartProcessor #new


# new
def cart(request):
    return {"cart": CartProcessor(request)}



# def cart(request):
#     return {'cart': Cart(request)}
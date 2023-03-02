from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from .models import Category, Product
from cart.forms import CartAddProductForm
import home_page

# Create your views here.

from .models import Category, Product
def product_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)
    return render(
        request,
        'store/list.html',
        {'category': category, 
        'categories':categories,
        'products':products}
        )

def product_detail(request, id, slug):
    product = get_object_or_404(
        Product,
        id=id,
        slug=slug,
        available=True
        )
    
    cart_product_form = CartAddProductForm()
    return render(request, 'store/detail.html', {'product': product, 'cart_product_form': cart_product_form})

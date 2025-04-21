import json
import urllib.parse
import urllib.parse

from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template import loader

from .models import Product, Order


def index(request):
    products = Product.objects.filter(bestseller=True)
    template = loader.get_template('index.html')
    context = {
        'title': 'Главная',
        'products': products
    }
    return HttpResponse(template.render(context, request))


def catalog(request):
    products = Product.objects.all()

    template = loader.get_template('catalog.html')
    context = {
        'title': 'Каталог',
        'products': products
    }
    return HttpResponse(template.render(context, request))


def cart(request):
    product_ids = get_product_ids(request)

    # Получаем товары из базы данных по ID
    products_from_db = Product.objects.filter(id__in=product_ids)

    # Создаем список товаров для отображения в корзине
    cart_items = []
    total_price = 0

    for product in products_from_db:
        # Поскольку мы храним только ID, каждый товар представлен в единственном экземпляре
        item_price = product.price
        total_price += item_price

        # Добавляем информацию о товаре в список
        cart_items.append({
            'id': product.id,
            'title': product.title,
            'img': product.img,
            'price': product.price,
            'total': item_price
        })

    template = loader.get_template('cart.html')
    context = {
        'title': 'Корзина',
        'cart_items': cart_items,
        'total_price': total_price,
        'empty_cart': len(cart_items) == 0
    }
    return HttpResponse(template.render(context, request))


def order(request):
    product_ids = get_product_ids(request)

    # Проверяем, есть ли товары в корзине
    if not product_ids:
        # Если корзина пуста, перенаправляем на страницу каталога
        return redirect('catalog')

    # Получаем товары из базы данных по ID
    products_from_db = Product.objects.filter(id__in=product_ids)

    # Подсчитываем общую стоимость
    total_price = sum(product.price for product in products_from_db)

    # Если форма отправлена
    if request.method == 'POST':
        # Получаем данные формы
        client_name = request.POST.get('client_name')
        client_phone = request.POST.get('client_phone')

        # Проверяем, что обязательные поля заполнены
        if client_name and client_phone:
            # Создаем новый заказ
            order = Order(
                client_name=client_name,
                client_phone=client_phone,
                total_price=total_price
            )
            order.save()

            # Добавляем товары к заказу
            for product in products_from_db:
                order.products.add(product)

            # Очищаем корзину (устанавливаем пустой массив в куки)
            response = redirect('order_success')  # Перенаправляем на страницу успешного заказа
            response.set_cookie('cart_ids', '[]', max_age=7 * 24 * 60 * 60)  # Очищаем куки корзины
            return response

    # Если GET запрос или не все поля заполнены
    template = loader.get_template('order.html')
    context = {
        'title': 'Заказ',
        'products': products_from_db,
        'total_price': total_price,
        'empty_cart': len(products_from_db) == 0
    }
    return HttpResponse(template.render(context, request))


def order_success(request):
    # Получаем последний созданный заказ для текущей сессии
    # В реальном приложении вы бы передавали ID заказа в URL или хранили его в сессии
    latest_order = Order.objects.latest('created_at')
    order_number = latest_order.id if latest_order else None

    template = loader.get_template('order_success.html')
    context = {
        'title': 'Заказ успешно оформлен',
        'order_number': order_number
    }
    response = HttpResponse(template.render(context, request))
    response.set_cookie('cart_ids', '[]', max_age=7 * 24 * 60 * 60)

    return response


def get_product_ids(request):
    # Получаем массив ID товаров из cookies
    cart_ids_cookie = request.COOKIES.get('cart_ids', '[]')
    try:
        # Сначала декодируем URL-кодированное значение
        decoded_cart_ids = urllib.parse.unquote(cart_ids_cookie)
        product_ids = json.loads(decoded_cart_ids)
    except (json.JSONDecodeError, TypeError):
        product_ids = []
    return product_ids

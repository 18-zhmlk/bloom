from django.db import models

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.TextField()
    img = models.TextField()
    price = models.IntegerField()
    details = models.TextField()
    published = models.BooleanField(default=True)
    bestseller = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    client_name = models.CharField(max_length=100)
    client_phone = models.CharField(max_length=20)
    products = models.ManyToManyField(Product)
    total_price = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Заказ №{self.id} от {self.client_name}"
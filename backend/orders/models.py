from django.db import models
from users.models import User

from products.models import Product


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default="En attente")
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Commandes"

    def __str__(self):
        return f"Commande #{self.id} - {self.user.name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete= models.CASCADE)
    product = models.ForeignKey(Product , on_delete= models.CASCADE)
    quantity = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity}x {self.product.name} - {self.price}€"
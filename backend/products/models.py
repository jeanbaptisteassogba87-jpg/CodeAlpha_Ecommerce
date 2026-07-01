from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add= True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Produits"

    def __str__(self):
        return f"{self.name} - {self.price}FCFA"



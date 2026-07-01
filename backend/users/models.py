from django.db import models

class User(models.Model) :
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add= True)

    class Meta :
        ordering = ['-created_at']
        verbose_name_plural = "Utilisateurs"

    def __str__(self):
        return f"{self.name}"


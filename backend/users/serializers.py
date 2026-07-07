from rest_framework import serializers
from .models import User
from django.contrib.auth.models import User as AuthUser
from django.contrib.auth.hashers import make_password
from django.db import transaction

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            'password':{'write_only':True}
        }

    def validate_name(self, value):
        if AuthUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("Ce nom d'utilisateur est déjà utilisé.")

        return value

    @transaction.atomic
    def create(self, validated_data):
        password = validated_data.get('password')
        validated_data['password'] = make_password(password)
        user = User.objects.create(**validated_data)

        AuthUser.objects.create_user(
            username=validated_data.get('name'),
            email=validated_data.get('email'),
            password=password
        )

        return user

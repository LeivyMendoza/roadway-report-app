from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, driver_license_number, phone_number, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not driver_license_number:
            raise ValueError('Users must have a driver license number')

        user = self.model(
            email=self.normalize_email(email),
            driver_license_number=driver_license_number,
            phone_number=phone_number,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, driver_license_number, phone_number, password):
        user = self.create_user(
            email,
            password=password,
            driver_license_number=driver_license_number,
            phone_number=phone_number,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

# Custom User Model
class User(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    driver_license_number = models.CharField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=255, null=True, blank=True)
    password = models.CharField(max_length=255)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['driver_license_number', 'phone_number']

    def __str__(self):
        return self.email

# Report Model
class Report(models.Model):
    STATUS_CHOICES = [
        ('Submitted', 'Submitted'),
        ('InProgress', 'InProgress'),
        ('Resolved', 'Resolved'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=255)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    location = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

# Comment Model
class Comment(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

# Media Model
class Media(models.Model):
    TYPE_CHOICES = [
        ('Photo', 'Photo'),
        ('Video', 'Video'),
    ]
    report = models.ForeignKey(Report, on_delete=models.CASCADE)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    url = models.CharField(max_length=255)

# Official Model
class Official(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

# Notification Model
class Notification(models.Model):
    STATUS_CHOICES = [
        ('Unread', 'Unread'),
        ('Read', 'Read'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)

# Leaderboard Model
class Leaderboard(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    reports_count = models.IntegerField(default=0)

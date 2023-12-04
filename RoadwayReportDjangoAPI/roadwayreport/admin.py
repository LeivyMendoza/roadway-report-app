from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'driver_license_number', 'is_official')
    # Add more customization as per your requirements

admin.site.register(User, UserAdmin)
from rest_framework import serializers 
from roadwayreport.models import *
 
 
class OfficialSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Official
        fields = ('id',
                  'name',
                  'email',
                  'password')

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Add password field

    class Meta:
        model = User
        fields = ('id',
                  'last_login',
                  'email',
                  'driver_license_number',
                  'phone_number',
                  'password')  # Include 'password' in fields

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            driver_license_number=validated_data['driver_license_number'],
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user
        
class LeaderboardSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Leaderboard
        fields = ('user_email', 'reports_count')
        
class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['user', 'type', 'status', 'location', 'description', 'created_at', 'updated_at']
        read_only_fields = ('user',)

class NotificationSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Notification
        fields = ('id',
                  'content',
                  'created_at',
                  'status',
                  'user')
        
class MediaSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Media
        fields = ('id',
                  'type',
                  'url',
                  'report')
        
class CommentSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Comment
        fields = ('id',
                  'content',
                  'created_at',
                  'report',
                  'user')
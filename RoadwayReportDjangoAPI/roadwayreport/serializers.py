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
    isOfficial = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('id',
                  'last_login',
                  'email',
                  'driver_license_number',
                  'phone_number',
                  'password',
                  'isOfficial')  # Include 'password' in fields

    def create(self, validated_data):
        is_official = validated_data.pop('isOfficial', False)
        user = User(
            email=validated_data['email'],
            driver_license_number=validated_data['driver_license_number'],
        )
        user.set_password(validated_data['password'])  # Hash the password
        if is_official:
            user.is_official = True
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
        fields = ('id', 'content', 'created_at', 'report', 'user')
        read_only_fields = ('user',)  # Set 'user' as read-only

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super(CommentSerializer, self).create(validated_data)
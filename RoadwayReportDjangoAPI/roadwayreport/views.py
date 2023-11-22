from rest_framework import status
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Official, User, Leaderboard, Report, Notification, Media, Comment
from .serializers import (
    OfficialSerializer, UserSerializer, LeaderboardSerializer,
    ReportSerializer, NotificationSerializer, MediaSerializer, CommentSerializer
)

# Official ViewSet
class OfficialListCreate(generics.ListCreateAPIView):
    queryset = Official.objects.all()
    serializer_class = OfficialSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class OfficialDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Official.objects.all()
    serializer_class = OfficialSerializer
    permission_classes = [permissions.IsAuthenticated]

# User ViewSet
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # Allows sign up by anyone

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

# Leaderboard ViewSet
class LeaderboardList(generics.ListAPIView):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Report ViewSet
class ReportListCreate(generics.ListCreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]

class ReportDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]

# Notification ViewSet
class NotificationListCreate(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

class NotificationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

# Media ViewSet
class MediaListCreate(generics.ListCreateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class MediaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [permissions.IsAuthenticated]

# Comment ViewSet
class CommentListCreate(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['POST'])
def login_view(request):
    pass

@api_view(['GET'])
def dashboard_info(request):
    user = request.user
    reports = Report.objects.filter(user=user)
    serializer = ReportSerializer(reports, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def report_pothole(request):
    pass

@api_view(['GET'])
def confirmation(request):
    # Pass the report ID as a query parameter.
    report_id = request.query_params.get('report_id')
    try:
        report = Report.objects.get(id=report_id)
        return Response({'id': report.id, 'status': report.status})
    except Report.DoesNotExist:
        return Response({'error': 'Report not found.'}, status=status.HTTP_404_NOT_FOUND)
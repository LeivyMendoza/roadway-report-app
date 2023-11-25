from rest_framework import status, viewsets
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
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

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

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
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(email=email, password=password)

    if user is not None:
        # Successfully authenticated. You can add logic here to return a token or session ID.
        return Response({'message': 'Login successful.'}, status=status.HTTP_200_OK)
    else:
        # Authentication failed
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def dashboard_info(request):
    reports = Report.objects.all()  # Fetch all reports
    serializer = ReportSerializer(reports, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@login_required
@permission_classes([IsAuthenticated])
def report_pothole(request):
    serializer = ReportSerializer(data=request.data)

    if serializer.is_valid():
        # Set the user to the currently authenticated user
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def confirmation(request):
    # Pass the report ID as a query parameter.
    report_id = request.query_params.get('report_id')
    try:
        report = Report.objects.get(id=report_id)
        return Response({'id': report.id, 'status': report.status})
    except Report.DoesNotExist:
        return Response({'error': 'Report not found.'}, status=status.HTTP_404_NOT_FOUND)
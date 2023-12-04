from rest_framework import status, viewsets
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required, user_passes_test
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
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
class LeaderboardList(APIView):
    def get(self, request):
        leaderboard = Leaderboard.objects.all()
        serializer = LeaderboardSerializer(leaderboard, many=True)
        return Response(serializer.data)

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
@method_decorator(csrf_exempt, name='dispatch')
class CommentListCreate(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        # Save the user to the database
        user = serializer.save()

        # Generate a token for the user
        refresh = RefreshToken.for_user(user)
        tokens = {
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }

        return Response(tokens, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

@api_view(['GET', 'POST'])
def comment_list_create(request):
    if request.method == 'GET':
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_comments_for_report(request, report_id):
    comments = Comment.objects.filter(report_id=report_id)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_if_official(request):
    user = request.user
    is_official = user.is_official if hasattr(user, 'is_official') else False
    return Response({"is_official": is_official})

def is_official(user):
    return user.is_official

@login_required
@user_passes_test(is_official)
def some_view(request):
    pass

@api_view(['GET', 'POST'])
@user_passes_test(is_official)
def manage_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@user_passes_test(is_official)
def delete_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.delete()
        return Response(status=204)
    except User.DoesNotExist:
        return Response(status=404)
    
@api_view(['DELETE'])
@user_passes_test(is_official)
def delete_report(request, report_id):
    try:
        report = Report.objects.get(id=report_id)
        report.delete()
        return Response(status=204)
    except Report.DoesNotExist:
        return Response(status=404)
    
@api_view(['PATCH'])
@user_passes_test(is_official)
def update_report_status(request, report_id):
    try:
        report = Report.objects.get(id=report_id)
        report.status = request.data.get('status')
        report.save()
        return Response(status=200)
    except Report.DoesNotExist:
        return Response(status=404)
from rest_framework import serializers
from .models import BlogPost, Comment, Like, Bookmark, Category
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'profile_picture', 'is_active']
        read_only_fields = ['id', 'email', 'is_active']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'created_at']
        read_only_fields = ['id', 'created_at']
        
class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'parent', 'content', 'is_approved', 'created_at', 'updated_at', 'replies']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_replies(self, obj):
        return CommentSerializer(obj.get_replies(), many=True).data

class BlogPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(many=True, read_only=True)
    # Accept category slugs for write operations
    category_slugs = serializers.SlugRelatedField(
        queryset=Category.objects.all(),
        many=True,
        slug_field='slug',
        write_only=True,
        source='category'
    )
    comments = serializers.SerializerMethodField(read_only=True)
    image = serializers.ImageField(required=False)
    total_likes = serializers.IntegerField(read_only=True)
    total_comments = serializers.IntegerField(read_only=True)

    class Meta:
        model = BlogPost
        fields = [
<<<<<<< HEAD
            'id', 'title', 'content', 'image', 'slug', 'status', 'view_count',
=======
            'id', 'title', 'content', 'image', 'slug', 'status',
>>>>>>> c841de7 (Initial commit from second computer)
            'created_at', 'updated_at', 'author', 'comments', 'category', 'category_slugs',
            'total_likes', 'total_comments'
        ]
        read_only_fields = [
<<<<<<< HEAD
            'id', 'slug', 'view_count', 'created_at', 'updated_at',
=======
            'id', 'slug', 'created_at', 'updated_at',
>>>>>>> c841de7 (Initial commit from second computer)
            'author', 'comments', 'category', 'total_likes', 'total_comments'
        ]

    def get_comments(self, obj):
        # Only top-level comments
        top_level_comments = obj.comments.filter(parent__isnull=True)
        return CommentSerializer(top_level_comments, many=True).data
        

class BookmarkSerializer(serializers.ModelSerializer):
    post = BlogPostSerializer(read_only=True)
    class Meta:
        model = Bookmark
        fields = ['id', 'post', 'created_at']
        read_only_fields = ['id', 'post', 'created_at']
        

class UserFullInfoSerializer(serializers.ModelSerializer):
    drafts = serializers.SerializerMethodField()
    blog_posts = serializers.SerializerMethodField()
    bookmarks = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'profile_picture', 'drafts', 'blog_posts', 'bookmarks']
        read_only_fields = ['id', 'email', 'drafts', 'blog_posts', 'bookmarks']

    def get_drafts(self, obj):
        from .models import BlogPost
        drafts = BlogPost.objects.filter(author=obj, status=BlogPost.Status.DRAFT)
        return BlogPostSerializer(drafts, many=True).data

    def get_blog_posts(self, obj):
        from .models import BlogPost
        posts = BlogPost.objects.filter(author=obj)
        return BlogPostSerializer(posts, many=True).data

    def get_bookmarks(self, obj):
        from .models import Bookmark
        bookmarks = Bookmark.objects.filter(user=obj).select_related('post')
        return BookmarkSerializer(bookmarks, many=True).data
        

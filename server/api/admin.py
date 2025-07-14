from django.contrib import admin
from .models import Category, BlogPost, Comment, Like, Bookmark, BlogPostView
from users.models import User


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'created_at']
    list_filter = ['type']
    readonly_fields = ['name', 'slug', 'created_at']
    ordering = ['name']


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'status', 'category_list', 'view_count', 'created_at']
    list_filter = ['status', 'category', 'created_at']
    search_fields = ['title', 'content']
    readonly_fields = ['slug', 'view_count', 'created_at', 'updated_at']
    filter_horizontal = ['category']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'content', 'image', 'author', 'status')
        }),
        ('Categorization', {
            'fields': ('category',),
        }),
        ('Analytics', {
            'fields': ('view_count',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def category_list(self, obj):
        return ", ".join([cat.name for cat in obj.category.all()])
    category_list.short_description = 'Categories'
    
    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('category')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['post', 'author', 'is_approved', 'is_reply', 'created_at']
    list_filter = ['is_approved', 'created_at']
    search_fields = ['content', 'author__email', 'post__title']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Comment Details', {
            'fields': ('post', 'author', 'parent', 'content', 'is_approved')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def is_reply(self, obj):
        return obj.parent is not None
    is_reply.boolean = True
    is_reply.short_description = 'Is Reply'


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ['post', 'user', 'created_at']
    list_filter = ['created_at']
    search_fields = ['post__title', 'user__email']
    readonly_fields = ['created_at']


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ['post', 'user', 'created_at']
    list_filter = ['created_at']
    search_fields = ['post__title', 'user__email']
    readonly_fields = ['created_at']


@admin.register(BlogPostView)
class BlogPostViewAdmin(admin.ModelAdmin):
    list_display = ['post', 'user', 'ip_address', 'created_at']
    list_filter = ['created_at']
    search_fields = ['post__title', 'user__email', 'ip_address']
    readonly_fields = ['created_at']
    
    def has_add_permission(self, request):
        # Prevent manual creation of view records
        return False
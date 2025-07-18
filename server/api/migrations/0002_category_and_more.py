# Generated by Django 5.2.3 on 2025-07-10 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('artificial_intelligence', 'Artificial Intelligence'), ('hardware', 'Hardware'), ('smartphone', 'Smartphone'), ('gaming', 'Gaming'), ('how_to', 'How To'), ('news', 'News'), ('other', 'Other')], default='other', max_length=30, unique=True)),
                ('name', models.CharField(editable=False, max_length=50)),
                ('slug', models.SlugField(editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.RemoveIndex(
            model_name='blogpost',
            name='api_blogpos_categor_83b24e_idx',
        ),
        migrations.RemoveField(
            model_name='blogpost',
            name='meta_description',
        ),
        migrations.RemoveField(
            model_name='blogpost',
            name='meta_title',
        ),
        migrations.RemoveField(
            model_name='blogpost',
            name='published_at',
        ),
        migrations.RemoveField(
            model_name='blogpost',
            name='category',
        ),
        migrations.AddField(
            model_name='blogpost',
            name='category',
            field=models.ManyToManyField(blank=True, to='api.category'),
        ),
    ]

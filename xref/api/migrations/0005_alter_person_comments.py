# Generated by Django 4.2 on 2023-07-13 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_merge_20230713_2029'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='comments',
            field=models.TextField(blank=True),
        ),
    ]

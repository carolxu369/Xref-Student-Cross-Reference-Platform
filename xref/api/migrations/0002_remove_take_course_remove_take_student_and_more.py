# Generated by Django 4.2 on 2023-07-07 02:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='take',
            name='course',
        ),
        migrations.RemoveField(
            model_name='take',
            name='student',
        ),
        migrations.RemoveField(
            model_name='csvrow',
            name='clac_grade',
        ),
        migrations.DeleteModel(
            name='Course',
        ),
        migrations.DeleteModel(
            name='Take',
        ),
    ]
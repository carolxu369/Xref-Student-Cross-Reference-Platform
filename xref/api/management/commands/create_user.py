from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Create a specific user with credentials'

    def handle(self, *args, **options):
        username = 'desired_username'
        password = 'desired_password'

        # Delete existing user if necessary
        User.objects.filter(username=username).delete()

        # Create the user
        User.objects.create_user(username=username, password=password)

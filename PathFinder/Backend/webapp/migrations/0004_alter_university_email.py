# Generated by Django 4.1.13 on 2024-07-08 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webapp", "0003_announcement_universityname_collegeadmin_name_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="university",
            name="email",
            field=models.EmailField(blank=True, max_length=254),
        ),
    ]

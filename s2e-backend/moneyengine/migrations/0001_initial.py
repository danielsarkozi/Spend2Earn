# Generated by Django 2.2.6 on 2019-10-22 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('receiverID', models.IntegerField()),
                ('senderID', models.IntegerField()),
                ('amount', models.IntegerField()),
                ('message', models.CharField(max_length=110)),
                ('status', models.CharField(max_length=20)),
            ],
        ),
    ]
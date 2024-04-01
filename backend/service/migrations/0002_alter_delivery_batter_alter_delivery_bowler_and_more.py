# Generated by Django 4.2.11 on 2024-03-25 17:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='delivery',
            name='batter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='batter', to='service.player'),
        ),
        migrations.AlterField(
            model_name='delivery',
            name='bowler',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bowler', to='service.player'),
        ),
        migrations.AlterField(
            model_name='delivery',
            name='fielder',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='fielder', to='service.player'),
        ),
        migrations.AlterField(
            model_name='delivery',
            name='non_striker',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='non_striker', to='service.player'),
        ),
        migrations.AlterField(
            model_name='delivery',
            name='player_dismissed',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='player_dismissed', to='service.player'),
        ),
    ]
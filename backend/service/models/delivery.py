from django.db import models

from service.models import Match, Player


class Delivery(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    innings = models.IntegerField()
    over = models.IntegerField()
    ball = models.IntegerField()
    batter = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="batter")
    bowler = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="bowler")
    non_striker = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name="non_striker"
    )
    extra_type = models.CharField(max_length=50, null=True)
    batsman_run = models.IntegerField()
    extra_run = models.IntegerField()
    total_run = models.IntegerField()
    non_boundary = models.BooleanField()
    is_wicket = models.BooleanField()
    player_dismissed = models.ForeignKey(
        Player, on_delete=models.CASCADE, null=True, related_name="player_dismissed"
    )
    dismissal_kind = models.CharField(max_length=50, null=True)
    fielder = models.ForeignKey(
        Player, on_delete=models.CASCADE, null=True, related_name="fielder"
    )
    batting_team = models.CharField(max_length=100)

    class Meta:
        db_table = "Delivery"

    def __str__(self):
        return f"Delivery {self.ball} of Over {self.over} in Match {self.match.id}"

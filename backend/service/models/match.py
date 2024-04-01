from django.db import models


class Match(models.Model):
    id = models.BigIntegerField(primary_key=True)
    city = models.CharField(max_length=100, null=True)
    date = models.DateField()
    season = models.CharField(max_length=10)
    match_number = models.CharField(max_length=25)
    team1 = models.CharField(max_length=100)
    team2 = models.CharField(max_length=100)
    venue = models.CharField(max_length=150)
    toss_winner = models.CharField(max_length=100)
    toss_decision = models.CharField(max_length=50)
    super_over = models.CharField(max_length=10, null=True)
    winning_team = models.CharField(max_length=100, null=True)
    won_by = models.CharField(max_length=50)
    margin = models.IntegerField(null=True)
    method = models.CharField(max_length=100, null=True)
    player_of_match = models.CharField(max_length=100, null=True)
    team1_players = models.ManyToManyField("Player", related_name="matches_as_team1")
    team2_players = models.ManyToManyField("Player", related_name="matches_as_team2")
    umpire1 = models.CharField(max_length=100)
    umpire2 = models.CharField(max_length=100)

    class Meta:
        db_table = "Match"

    def __str__(self):
        return f"Match {self.match_number} of IPL Season {self.season}"

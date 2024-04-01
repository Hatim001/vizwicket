from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal

class Player(models.Model):
    name = models.CharField(max_length=255)
    team = models.CharField(max_length=100)
    player_type = models.CharField(max_length=100)  # Assuming 'Type' refers to player role/type
    value_in_cr = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(Decimal('0.00'))])
    full_name = models.CharField(max_length=255)
    birth_date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    national_side = models.CharField(max_length=100)
    batting_style = models.CharField(max_length=100)
    bowling_style = models.CharField(max_length=100)
    sport = models.CharField(max_length=50)  # This might not be necessary as we know it's cricket
    matches_played = models.IntegerField()
    innings_batted = models.IntegerField()
    not_outs = models.IntegerField()
    runs_scored = models.IntegerField()
    highest_inn_score = models.CharField(max_length=50)  # String to account for not outs 'e.g. 106*'
    centuries = models.IntegerField()
    fifties = models.IntegerField()
    fours = models.IntegerField()
    sixes = models.IntegerField()
    batting_avg = models.DecimalField(max_digits=5, decimal_places=2)
    batting_strike_rate = models.DecimalField(max_digits=5, decimal_places=2)
    catches_taken = models.IntegerField()
    stumpings_made = models.IntegerField()
    ducks = models.IntegerField()
    run_outs = models.IntegerField()  # Assuming 'R/O' is run outs
    innings_bowled = models.IntegerField(blank=True, null=True)  # These fields are blank as not all players bowl
    overs_bowled = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    maidens_bowled = models.IntegerField(blank=True, null=True)
    runs_conceded = models.IntegerField(blank=True, null=True)
    wickets_taken = models.IntegerField(blank=True, null=True)
    best_bowling = models.CharField(max_length=50, blank=True, null=True)
    three_wickets = models.IntegerField(blank=True, null=True)  # Assuming '3s' refers to number of times taken 3 wickets
    five_wickets = models.IntegerField(blank=True, null=True)  # Assuming '5s' refers to number of times taken 5 wickets
    bowling_avg = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    economy_rate = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    bowling_strike_rate = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        db_table = "Player"

    def __str__(self):
        return self.name

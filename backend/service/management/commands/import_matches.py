import os
import pandas as pd
from datetime import datetime
from fuzzywuzzy import process

from django.conf import settings
from django.core.management.base import BaseCommand

from service.models import Player, Match


class Command(BaseCommand):
    help = "Import matches from csv file"

    def handle(self, *args, **kwargs):
        dataset_path = os.path.join(settings.BASE_DIR, "dataset")
        file_path = os.path.join(dataset_path, "matches.csv")

        self.import_matches(file_path)

    def prepare_player_list(self):
        return Player.objects.all().values_list("name", flat=True)

    def import_matches(self, file_path):
        if Player.objects.all().count() <= 0:
            self.stdout.write(
                self.style.WARNING("Import players before importing matches")
            )
            return

        if Match.objects.all().count() > 0:
            self.stdout.write(
                self.style.WARNING("Matches already imported! Aborting...")
            )
            return

        self.stdout.write(self.style.SUCCESS(f"Importing matches from {file_path}"))
        df = pd.read_csv(file_path, na_values=["nan", "NaN", "NAN", None])
        df.replace([pd.NaT, pd.NA, "nan", "NaN", "NAN"], [None] * 5, inplace=True)
        df = df.where(pd.notnull(df), None)
        df.fillna(value="", inplace=True)
        match_list = []

        choices = self.prepare_player_list()
        player_mapper = {}

        for _, row in df.iterrows():
            match = Match(
                id=row.get("ID"),
                city=row.get("City"),
                date=datetime.strptime(row.get("Date"), "%Y-%m-%d").date(),
                season=row.get("Season"),
                match_number=row.get("MatchNumber"),
                team1=row.get("Team1"),
                team2=row.get("Team2"),
                venue=row.get("Venue"),
                toss_winner=row.get("TossWinner"),
                toss_decision=row.get("TossDecision"),
                super_over=row.get("SuperOver"),
                winning_team=row.get("WinningTeam"),
                won_by=row.get("WonBy"),
                margin=row.get("Margin") or 0,
                method=row.get("method"),
                player_of_match=row.get("Player_of_Match"),
                umpire1=row.get("Umpire1"),
                umpire2=row.get("Umpire2"),
            )
            match.save()
            team1_players = (
                row.get("Team1Players").strip("][").replace("'", "").split(", ")
            )
            team2_players = (
                row.get("Team2Players").strip("][").replace("'", "").split(", ")
            )

            for player in team1_players:
                if player in player_mapper:
                    match.team1_players.add(player_mapper[player])
                else:
                    relevant_player = process.extract(player, choices, limit=1)
                    print("relevant_player - team1", relevant_player)
                    if relevant_player:
                        player_mapper[player] = Player.objects.get(
                            name=relevant_player[0][0]
                        )

            for player in team2_players:
                if player in player_mapper:
                    match.team2_players.add(player_mapper[player])
                else:
                    relevant_player = process.extract(player, choices, limit=1)
                    print("relevant_player - team2", relevant_player)
                    if relevant_player:
                        player_mapper[player] = Player.objects.get(
                            name=relevant_player[0][0]
                        )

            match.save()

        self.stdout.write(
            self.style.SUCCESS(f"Matches imported from {file_path} successfully!")
        )
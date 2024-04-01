import os
import pandas as pd
from datetime import datetime

from django.conf import settings
from django.core.management.base import BaseCommand

from service.models import Player


class Command(BaseCommand):
    help = "Import players from a CSV file"

    def handle(self, *args, **kwargs):
        dataset_path = os.path.join(settings.BASE_DIR, "dataset")
        file_path = os.path.join(dataset_path, "players.csv")

        self.import_players(file_path)

    def prepare_dob(self, dob):
        if not dob:
            return None
        parsed_str = dob.split(" ")
        dob_string = f"{parsed_str[0]} {parsed_str[1]} {parsed_str[2]}"
        return datetime.strptime(dob_string, "%B %d, %Y").date()

    def prepare_location(self, location):
        if not location:
            return None
        parsed_str = location.split(" ")
        return "".join(parsed_str[3:])

    def import_players(self, file_path: str) -> None:
        if Player.objects.all().count() > 0:
            self.stdout.write(
                self.style.WARNING("Players already imported! Aborting...")
            )
            return

        self.stdout.write(self.style.SUCCESS(f"Importing players from {file_path}"))
        df = pd.read_csv(file_path, na_values=["nan", "NaN", "NAN", None])
        df.replace([pd.NaT, pd.NA, "nan", "NaN", "NAN"], [None] * 5, inplace=True)
        df = df.where(pd.notnull(df), None)
        df.fillna(value="", inplace=True)
        player_list = []
        for _, row in df.iterrows():
            player_list.append(
                Player(
                    **{
                        "name": row.get("Name"),
                        "team": row.get("Team"),
                        "player_type": row.get("Type"),
                        "value_in_cr": float(row.get("ValueinCR") or 0),
                        "full_name": row.get("Full Name"),
                        "birth_date": self.prepare_dob(row.get("Born")),
                        "location": self.prepare_location(row.get("Born")),
                        "national_side": row.get("National Side"),
                        "batting_style": row.get("Batting Style"),
                        "bowling_style": row.get("Bowling"),
                        "sport": row.get("Sport"),
                        "matches_played": row.get("MatchPlayed") or 0,
                        "innings_batted": row.get("InningsBatted") or 0,
                        "not_outs": row.get("NotOuts") or 0,
                        "runs_scored": row.get("RunsScored") or 0,
                        "highest_inn_score": row.get("HighestInnScore"),
                        "centuries": row.get("100s") or 0,
                        "fifties": row.get("50s") or 0,
                        "fours": row.get("4s") or 0,
                        "sixes": row.get("6s") or 0,
                        "batting_avg": float(row.get("BattingAVG") or 0),
                        "batting_strike_rate": float(row.get("BattingS/R") or 0),
                        "catches_taken": row.get("CatchesTaken") or 0,
                        "stumpings_made": row.get("StumpingsMade") or 0,
                        "ducks": row.get("Ducks") or 0,
                        "run_outs": row.get("R/O") or 0,
                        "innings_bowled": row.get("InningsBowled") or 0,
                        "overs_bowled": float(row.get("Overs") or 0),
                        "maidens_bowled": row.get("Maidens") or 0,
                        "runs_conceded": row.get("RunsConceded") or 0,
                        "wickets_taken": row.get("Wickets") or 0,
                        "best_bowling": row.get("Best"),
                        "three_wickets": row.get("3s") or 0,
                        "five_wickets": row.get("5s") or 0,
                        "bowling_avg": float(row.get("BowlingAVG") or 0),
                        "economy_rate": float(row.get("EconomyRate") or 0),
                        "bowling_strike_rate": float(row.get("S/R") or 0),
                    }
                )
            )

        Player.objects.bulk_create(player_list)
        self.stdout.write(
            self.style.SUCCESS(f"players imported from {file_path} successfully!")
        )

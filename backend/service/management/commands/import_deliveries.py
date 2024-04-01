import os
import pandas as pd
from datetime import datetime
from fuzzywuzzy import process

from django.conf import settings
from django.core.management.base import BaseCommand

from service.models import Player, Match, Delivery


class Command(BaseCommand):
    help = "Import deliveries from csv file"

    def handle(self, *args, **kwargs):
        dataset_path = os.path.join(settings.BASE_DIR, "dataset")
        file_path = os.path.join(dataset_path, "deliveries.csv")

        self.import_deliveries(file_path)

    def prepare_player_list(self):
        return Player.objects.all().values_list("name", flat=True)

    def import_deliveries(self, file_path):
        if Match.objects.all().count() <= 0:
            self.stdout.write(
                self.style.WARNING("Import matches before importing deliveries")
            )
            return

        if Player.objects.all().count() <= 0:
            self.stdout.write(
                self.style.WARNING("Import players before importing deliveries")
            )
            return

        if Delivery.objects.all().count() > 0:
            self.stdout.write(
                self.style.WARNING("Deliveries already imported! Aborting...")
            )
            return

        self.stdout.write(self.style.SUCCESS(f"Importing deliveries from {file_path}"))
        df = pd.read_csv(file_path, na_values=["nan", "NaN", "NAN", None])
        df.replace([pd.NaT, pd.NA, "nan", "NaN", "NAN"], [None] * 5, inplace=True)
        df = df.where(pd.notnull(df), None)
        df.fillna(value="", inplace=True)
        delivery_list = []
        choices = self.prepare_player_list()
        player_mapper = {}

        def get_player(name):
            if not name:
                return None
            if name in player_mapper:
                return player_mapper[name]
            relevant_player = process.extract(name, choices, limit=1)
            if relevant_player:
                player_mapper[name] = Player.objects.get(name=relevant_player[0][0])
                return player_mapper[name]
            else:
                return None

        for _, row in df.iterrows():
            match_id = row.get("ID")
            delivery_list.append(
                Delivery(
                    match_id=match_id,
                    innings=row.get("innings"),
                    over=row.get("overs"),
                    ball=row.get("ballnumber"),
                    batter=get_player(row.get("batter")),
                    bowler=get_player(row.get("bowler")),
                    non_striker=get_player(row.get("non-striker")),
                    extra_type=row.get("extra_type"),
                    batsman_run=row.get("batsman_run"),
                    extra_run=row.get("extras_run"),
                    total_run=row.get("total_run"),
                    non_boundary=row.get("non_boundary"),
                    is_wicket=row.get("isWicketDelivery"),
                    player_dismissed=get_player(row.get("player_out")),
                    dismissal_kind=row.get("kind"),
                    fielder=get_player(row.get("fielders_involved")),
                    batting_team=row.get("BattingTeam"),
                )
            )

        Delivery.objects.bulk_create(delivery_list)
        self.stdout.write(self.style.SUCCESS("Deliveries imported successfully"))

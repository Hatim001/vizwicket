from django.db.models import Sum, IntegerField, Count, F
from django.db.models.functions import Cast
from rest_framework.views import APIView
from django.http.response import JsonResponse

from service.models import Match, Delivery, Player


class MatchListView(APIView):

    def get(self, request, *args, **kwargs):
        """Get match list"""
        query_params = request.query_params
        year = int(query_params.get("year", 0) or 0)
        if not year or year not in range(2008, 2023):
            return JsonResponse({"message": "Invalid year!!"}, status=400)

        matches = Match.objects.filter(season=year).values()
        return JsonResponse(
            {"matches": list(matches), "message": "Fetched matches successfully!!"},
            status=200,
        )


class MatchSummaryView(APIView):

    def get_runs_per_over(self, match_id, team):
        return list(
            Delivery.objects.filter(match_id=match_id, batting_team=team)
            .values("over")
            .annotate(
                runs=Sum("total_run"),
                wickets=Sum(Cast("is_wicket", output_field=IntegerField())),
            )
            .order_by("over")
            .values("over", "runs", "wickets")
        )

    def get_cumulative_runs(self, deliveries):
        cumulative_runs = []
        total_runs = 0
        for delivery in deliveries:
            total_runs += delivery.get("runs")
            cumulative_runs.append(
                {
                    "over": delivery.get("over"),
                    "wicket": delivery.get("wickets"),
                    "cumulative_runs": total_runs,
                }
            )

        return cumulative_runs

    def get_wicket_distribution(self, match_id, team):
        return list(
            Delivery.objects.filter(
                match_id=match_id, batting_team=team, is_wicket=True
            )
            .values("bowler")
            .annotate(total_wickets=Count("id"), bowler_name=F("bowler__name"))
            .order_by("-total_wickets")
            .values("bowler_name", "total_wickets")
        )

    def get_boundaries(self, match_id, team):
        deliveries = Delivery.objects.filter(match_id=match_id, batting_team=team)
        total_runs = 0
        records = []
        for delivery in deliveries:
            total_runs += delivery.total_run
            if delivery.batsman_run in [4, 6]:
                records.append({
                    "over": delivery.over,
                    "ball": delivery.ball,
                    "batsman_run": delivery.batsman_run,
                    "batter": delivery.batter.name,
                    "cumulative_runs": total_runs
                })
        
        return records

    def get(self, request, match_id, *args, **kwargs):
        """
        Get match summary
        1. Runs per over
        2. Cumulative runs
        3. Wicket Distribution
        ...
        """

        team1 = request.query_params.get("team1", "")
        team2 = request.query_params.get("team2", "")
        if not any([match_id, team1, team2]):
            return JsonResponse({"message": "Invalid payload!!"}, status=400)

        rpo_team1 = self.get_runs_per_over(match_id, team1)
        rpo_team2 = self.get_runs_per_over(match_id, team2)

        cumulative_runs_team1 = self.get_cumulative_runs(rpo_team1)
        cumulative_runs_team2 = self.get_cumulative_runs(rpo_team2)

        wicket_distribution_team1 = self.get_wicket_distribution(match_id, team1)
        wicket_distribution_team2 = self.get_wicket_distribution(match_id, team2)

        boundaries_team1 = self.get_boundaries(match_id, team1)
        boundaries_team2 = self.get_boundaries(match_id, team2)

        return JsonResponse(
            {
                "runs_per_over_team1": rpo_team1,
                "runs_per_over_team2": rpo_team2,
                "cumulative_runs_team1": cumulative_runs_team1,
                "cumulative_runs_team2": cumulative_runs_team2,
                "wicket_distribution_team1": wicket_distribution_team1,
                "wicket_distribution_team2": wicket_distribution_team2,
                "boundaries_team1": boundaries_team1,
                "boundaries_team2": boundaries_team2,
                "message": "Fetched match summary successfully!!",
            },
            status=200,
        )

from django.urls import path

from service.models.views.api import MatchSummaryView, MatchListView

urlpatterns = [
    path("matches", MatchListView.as_view()),
    path("match/<int:match_id>/summary", MatchSummaryView.as_view()),
]

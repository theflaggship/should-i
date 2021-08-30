from ..models.db import db
from ..models.poll import Poll
from ..models.option import Option
from ..models.vote import Vote
from ..models.user import User
from flask import Blueprint, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages

vote_routes = Blueprint('votes', __name__)

# ------------------ GET ALL VOTES -------------------------

@vote_routes.route('/')
def get_all_votes():
  votes = Vote.query.all()
  return {"votes":[vote.to_dict() for vote in votes]}

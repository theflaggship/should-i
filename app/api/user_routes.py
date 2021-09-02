from ..models.db import db
from ..models.poll import Poll
from ..models.option import Option
from ..models.vote import Vote
from ..models.user import User
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)

# Get all users

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# Get user profile

@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# Get user polls

@user_routes.route('/<int:id>/polls/')
@login_required
def get_user_polls(id):
  polls_query = Poll.query.filter(Poll.user_id == id).all()
  polls = [poll.to_dict() for poll in polls_query]
  for poll in polls:
    options = Option.query.filter(
      Option.poll_id == poll["id"]).all()
    poll["options"] = [option.to_dict() for option in options]
    for option in poll["options"]:
      votes = Vote.query.filter(Vote.option_id == option["id"]).all()
      option["vote_count"] = len(votes)
      user_voted = False
      for vote in votes:
        if vote.user_id == current_user.id:
          user_voted = True
          break
      option["user_voted"] = user_voted
    user = User.query.filter(
       User.id == poll["user_id"]).first()
    poll["user"] = user.to_dict()
    sum = 0
    for option in options:
      sum += len(option.votes)
    poll["total_votes"] = sum
  return {"polls": polls}

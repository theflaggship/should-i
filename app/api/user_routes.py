from flask import Blueprint, jsonify
from flask_login import login_required
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
    return {"polls": polls}

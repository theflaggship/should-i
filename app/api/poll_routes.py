from ..models.db import db
from ..models.poll import Poll
from ..models.option import Option
from ..models.user import User
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..forms.poll_form import CreatePollForm

poll_routes = Blueprint('polls', __name__)

# Get all polls

@poll_routes.route('/')
def get_all_polls():
  polls_query = Poll.query.order_by(Poll.created_at.desc()).all()
  polls = [poll.to_dict() for poll in polls_query]
  for poll in polls:
    options = Option.query.filter(
      Option.poll_id == poll["id"]).all()
    poll["options"] = [option.to_dict() for option in options]
    user = User.query.filter(
       User.id == poll["user_id"]).first()
    poll["user"] = user.to_dict()
  return {"polls": polls}



# Create poll



# Edit poll



# Delete poll

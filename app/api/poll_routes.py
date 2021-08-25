from ..models.db import db
from ..models.poll import Poll
from ..models.user import User
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..forms.poll_form import CreatePollForm
from .auth_routes import validation_errors_to_error_messages

poll_routes = Blueprint('polls', __name__)

# Get all polls

@poll_routes.route('/')
@login_required
def get_all_polls():
  polls = Poll.query.order_by(Poll.created_at.desc()).all()
  print("++++++++++++++++")
  print(polls)
  print("++++++++++++++++")
  return {poll.id: poll.to_dict() for poll in polls}



# Create poll



# Edit poll



# Delete poll

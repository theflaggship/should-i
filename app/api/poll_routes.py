from ..models.db import db
from ..models.poll import Poll
from ..models.user import User
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..forms.poll_form import CreatePollForm

poll_routes = Blueprint('polls', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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

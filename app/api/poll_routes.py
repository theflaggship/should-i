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

@poll_routes.route('/', methods=['POST'])
@login_required
def create_poll():
  user = current_user
  form = CreatePollForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    poll_data = form.data
    poll = Poll(
      user_id=user.id,
      question=data['question'],
    )
    db.session.add(poll)
    db.session.commit()

    option = Option(
      
    )




# Edit poll



# Delete poll

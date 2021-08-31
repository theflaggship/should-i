from ..models.db import db
from ..models.poll import Poll
from ..models.option import Option
from ..models.vote import Vote
from ..models.user import User
from flask import Blueprint, request
from flask_login import current_user, login_required
from ..forms.poll_form import CreatePollForm
from ..forms.option_form import CreateOptionForm
from .auth_routes import validation_errors_to_error_messages

poll_routes = Blueprint('polls', __name__)

# -------------------- GET ALL POLLS AND OPTIONS -------------------------

@poll_routes.route('/')
def get_all_polls():
  polls_query = Poll.query.order_by(Poll.created_at.desc()).all()
  polls = [poll.to_dict() for poll in polls_query]
  for poll in polls:
    options = Option.query.filter(
      Option.poll_id == poll["id"]).all()
    poll["options"] = [option.to_dict() for option in options]
    for option in poll["options"]:
      votes = Vote.query.filter(Vote.option_id == option["id"]).all()
      print("===================")
      print(votes)
      option["votes"] = [vote.to_dict() for vote in votes]
    user = User.query.filter(
       User.id == poll["user_id"]).first()
    poll["user"] = user.to_dict()
  return {"polls": polls}

# # -------------------- CREATE POLL AND OPTIONS -------------------------


@poll_routes.route('/', methods=['POST'])
@login_required
def create_poll():
  user = current_user
  form = CreatePollForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  question = form.data['question']
  options = form.data['options'].split(",")
  if form.validate_on_submit():
    poll = Poll(
      user_id=user.id,
      question=form.data['question'],
    )
    db.session.add(poll)
    db.session.commit()
    for option in options:
      option = Option(
        poll_id=poll.id,
        content=option,
        image=form.data['image']
      )
      db.session.add(option)
    db.session.commit()
  return {"poll": poll.to_dict(), "options": [option.to_dict() for option in poll.options]}


# -------------------- EDIT POLL -------------------------

@poll_routes.route('/<int:id>/', methods=['PUT'])
def edit_poll(id):
  poll = Poll.query.get(id)
  form = CreatePollForm()
  question = form.data['question']
  oldOptions = Option.query.filter(Option.poll_id == id).all()
  newOptions = form.data['options'].split(",")
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    poll.question = question

    for option in oldOptions:
      db.session.delete(option)
      db.session.commit()

    for option in newOptions:
      option = Option(
        poll_id=poll.id,
        content=option,
        image=form.data['image']
      )
      db.session.add(option)
    db.session.commit()
  return {"poll": poll.to_dict(), "options": [option.to_dict() for option in poll.options]}

  if form.errors:
    errors = form.errors
    return {'errors': validation_errors_to_error_messages(errors)}, 401

# -------------------- EDIT ONE OPTION -------------------------

@poll_routes.route('/<int:poll_id>/options/<int:id>/', methods=['PUT'])
def edit_option(id):
  option = Option.query.get(id)
  form = CreateOptionForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    Option.content = form.data['question']
    Option.image = form.data['image']

    db.session.commit()
    return {**option.to_dict()}

  if form.errors:
    errors = form.errors
    return {'errors': validation_errors_to_error_messages(errors)}, 401

# -------------------- DELETE POLL AND OPTIONS -------------------------

@poll_routes.route('/<int:id>/', methods=['DELETE'])
def delete_poll(id):
  poll = Poll.query.get(id)
  options = Option.query.filter(Option.poll_id == id).all()
  for option in options:
    db.session.delete(option)
    db.session.commit()
  db.session.delete(poll)
  db.session.commit()
  return {}, 204

# -------------------- DELETE ONE OPTION IN POLL -------------------------

@poll_routes.route('/options/<int:id>/', methods=['DELETE'])
def delete_option(id):
  option = Option.query.get(id)
  db.session.delete(option)
  db.session.commit()

  return {}, 204

# -------------------- GET ALL VOTES FOR A POLL -------------------------

# -------------------- GET ALL VOTES FOR AN OPTION -------------------------

@poll_routes.route('/api/polls/<int:poll_id>/options/<int:option_id>/votes/')
def get_option_votes(option_id):
  votes = Vote.query.filter(Vote.option_id == option_id).all()
  option = Option.query.get(option_id)
  return {"option": option.to_dict(), "votes": [vote.to_dict() for vote in votes]}


# -------------------- CREATE A VOTE -------------------------

@poll_routes.route('/<int:poll_id>/options/<int:option_id>/votes/', methods=['POST'])
# @login_required
def cast_vote(option_id, poll_id):
  user = current_user
  poll = Poll.query.get(poll_id)

  for option in poll.options:
    for vote in option.votes:

      if vote.user_id == user.id:
        vote.option_id = option_id
        db.session.commit()
        return vote.to_dict()

  newVote = Vote(
    user_id=user.id,
    option_id=option_id,
  )
  db.session.add(newVote)
  db.session.commit()
  return newVote.to_dict()

# -------------------- EDIT/CHANGE A VOTE -------------------------

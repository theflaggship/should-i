from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TextField
from wtforms.validators import DataRequired, ValidationError

class CreatePollForm(FlaskForm):
  question = StringField('Question', validators=[DataRequired()])


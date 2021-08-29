from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TextField, FieldList, BooleanField
from wtforms.validators import DataRequired, ValidationError

class CreatePollForm(FlaskForm):
  question = StringField('question', validators=[DataRequired()])
  options = StringField('options', validators=[DataRequired()])
  image = BooleanField('Image')

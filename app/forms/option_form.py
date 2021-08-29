from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TextField, BooleanField
from wtforms.validators import DataRequired, ValidationError

class CreateOptionForm(FlaskForm):
  content = StringField('Content', validators=[DataRequired()])
  image = BooleanField('Image')

  

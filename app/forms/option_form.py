from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TextField, BooleanField
from wtforms.validators import DataRequired, ValidationError

class CreateOptionForm(FlaskForm):
  content = StringField('Question', validators=[DataRequired()])
  image = BooleanField('Image')

  def update_option(self, new_content):
    self.content = new_content

from .db import db
from datetime import datetime
from .option import Option

class Poll(db.Model):
  __tablename__ = "polls"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  question = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

  users = db.relationship("User", back_populates="polls")
  options = db.relationsip("Option", back_populates="polls")
  comments = db.relationship("Comment", back_populates="polls")

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'question': self.question,
      'created_at': self.created_at
    }

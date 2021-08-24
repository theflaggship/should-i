from .db import db
import datetime

class Vote(db.Model):
  __tablename__ = "votes"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  option_id = db.Column(db.Integer, db.ForeignKey("options.id"))
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

  users = db.relationship("User", back_populates="votes")
  options = db.relationship("Option", back_populates="votes")

  def to_dict(self):
    return {
      "id": self.id,
      "user.id": self.user_id,
      "option.id": self.option_id,
      "created_at": self.created_at
    }

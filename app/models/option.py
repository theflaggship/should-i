from .db import db
import datetime

class Option(db.Model):
  __tablename__ = "options"

  id = db.Column(db.Integer, primary_key=True)
  poll_id = db.Column(db.Integer, db.ForeignKey("polls.id"))
  content = db.Column(db.Text, nullable=False)
  image = db.Column(db.Boolean, default=False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

  polls = db.relationship("Poll", back_populates="options")
  votes = db.relationship("Vote", back_populates="options")

  def to_dict(self):
    return {
      "id": self.id,
      "poll_id": self.poll_id,
      "content": self.content,
      "image": self.image,
      "created_at": self.created_at,
      "user_voted": False,
      "vote_count": 0
  }

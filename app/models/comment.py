from .db import db
from datetime import datetime

class Comment(db.Model):
  __tablename__ = "comments"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  poll_id = db.Column(db.Integer, db.ForeignKey("polls.id"))
  caption = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

  users = db.relationship("User", back_populates="comments")
  polls = db.relationship("Poll", back_populates="comments")

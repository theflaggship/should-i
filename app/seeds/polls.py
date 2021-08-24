from app.models import db, Poll


# Adds a demo user, you can add other users here if you want
def seed_polls():
   poll1 = Poll(user_id=1, question="I want to learn how to code. What bootcamp should I go to?" )
   poll2 = Poll(user_id=2, question="I need a new acoustic guitar. What should I get?" )
   poll3 = Poll(user_id=3, question="What planet should I visit after Mars?" )
   poll4 = Poll(user_id=4, question="Should I..." )
   poll5 = Poll(user_id=5, question="I am starving. Should I have tacos or pizza?" )
   poll6 = Poll(user_id=6, question="Which wedding dress should I get marries in?" )
   poll7 = Poll(user_id=7, question="Should we allow users to make private polls?" )

   db.session.add(poll1)
   db.session.add(poll2)
   db.session.add(poll3)
   db.session.add(poll4)
   db.session.add(poll5)
   db.session.add(poll6)
   db.session.add(poll7)

   db.session.commit()



def undo_polls():
    db.session.execute('TRUNCATE polls;')
    db.session.commit()

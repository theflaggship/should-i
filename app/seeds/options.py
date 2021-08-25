from app.models import db, Option


# Adds a demo user, you can add other users here if you want
def seed_options():
   option1 = Option(poll_id=1, content="AppAcademy")
   option2 = Option(poll_id=1, content="FlatIron")
   option3 = Option(poll_id=1, content="HackReactor")
   option4 = Option(poll_id=2, content="Epiphone DR-100")
   option5 = Option(poll_id=2, content="Yamaha FG800")
   option6 = Option(poll_id=2, content="Martin LX1E Little Martin")
   option7 = Option(poll_id=2, content="Taylor 110e")
   option8 = Option(poll_id=3, content="Saturn")
   option9 = Option(poll_id=3, content="Venus")
   option10 = Option(poll_id=3, content="Pluto")
   option11 = Option(poll_id=4, content="Yes")
   option12 = Option(poll_id=4, content="No")
   option13 = Option(poll_id=5, content="https://cdn.pixabay.com/photo/2015/11/02/20/27/taco-1018962__340.jpg", image=True)
   option14 = Option(poll_id=5, content="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_640.jpg", image=True)
   option15 = Option(poll_id=6, content="https://cdn.pixabay.com/photo/2016/06/29/08/42/wedding-dress-1486260_640.jpg", image=True)
   option16 = Option(poll_id=6, content="https://cdn.pixabay.com/photo/2016/06/29/04/17/wedding-dress-1485984__340.jpg", image=True)
   option17 = Option(poll_id=6, content="https://cdn.pixabay.com/photo/2016/06/29/08/41/wedding-dresses-1486256__340.jpg", image=True)
   option18 = Option(poll_id=7, content="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/thumbs-up.png", image=True)
   option19 = Option(poll_id=7, content="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/thumbs-down.png", image=True)

   db.session.add(option1)
   db.session.add(option2)
   db.session.add(option3)
   db.session.add(option4)
   db.session.add(option5)
   db.session.add(option6)
   db.session.add(option7)
   db.session.add(option8)
   db.session.add(option9)
   db.session.add(option10)
   db.session.add(option11)
   db.session.add(option12)
   db.session.add(option13)
   db.session.add(option14)
   db.session.add(option15)
   db.session.add(option16)
   db.session.add(option17)
   db.session.add(option18)
   db.session.add(option19)

   db.session.commit()


def undo_options():
    db.session.execute('TRUNCATE options;')
    db.session.commit()

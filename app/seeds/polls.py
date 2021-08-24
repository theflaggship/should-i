from app.models import db, Poll


# Adds a demo user, you can add other users here if you want
def seed_polls():
   poll1 = Poll(caption="dummy caption", pic_url="https://lh6.ggpht.com/HlgucZ0ylJAfZgusynnUwxNIgIp5htNhShF559x3dRXiuy_UdP3UQVLYW6c=s1200", user_id= 2 )

   poll2 = Poll(caption="dummy caption", pic_url="https://www.tate.org.uk/art/images/work/N/N05/N05976_9.jpg", user_id=2)

   poll3 = Poll(caption="dummy caption", pic_url="https://www.homestratosphere.com/wp-content/uploads/2019/07/Cubism-art-833x1024.jpg", user_id= 1 )

   poll4 = Poll(caption="dummy caption", pic_url="https://media.vanityfair.com/photos/5e8f9f875752fb00088317c4/16:9/w_1280,c_limit/The-Art-of-Making-Art-About-a-Plague.jpg", user_id= 1 )

   poll5 = Poll(caption="dummy caption", pic_url="https://www.killyourdarlings.com.au/wp-content/uploads/2020/07/horse-1.jpg", user_id= 3 )

   poll6 = Poll(caption="dummy caption", pic_url="https://images.artsonia.com/art/93030215.jpg", user_id= 3 )

   poll7= Poll(caption="dummy caption", pic_url="https://media.timeout.com/images/105590782/750/422/image.jpg", user_id= 10 )
   poll8 = Poll(caption="dummy caption", pic_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR0CmwogoC8hHJaqWkdtG1K34toqYMgV84cw&usqp=CAU", user_id= 10 )

   poll9 = Poll(caption="dummy caption", pic_url="https://d1zdxptf8tk3f9.cloudfront.net/ckeditor_assets/pictures/2528/content_mr-tt-628115-unsplash.jpg", user_id= 7 )

   poll10 = Poll(caption="dummy caption", pic_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe_ZcKVdiu1-7eLtbes7mnF5mNvACzbBSZhg&usqp=CAU", user_id= 7)

   db.session.add(poll1)
   db.session.add(poll2)
   db.session.add(poll3)
   db.session.add(poll4)
   db.session.add(poll5)
   db.session.add(poll6)
   db.session.add(poll7)
   db.session.add(poll8)
   db.session.add(poll9)
   db.session.add(poll10)

   db.session.commit()



def undo_polls():
    db.session.execute('TRUNCATE polls;')
    db.session.commit()

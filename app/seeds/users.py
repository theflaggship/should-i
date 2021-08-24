from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        email='monte@user.com', username='theflaggship', profile_pic='https://i.imgur.com/VMYPjVw.jpg',  password='password')
    user2 = User(
        email='javier@user.com', username='javier', profile_pic='https://m.media-amazon.com/images/I/61hG0tEyFzL._SS500_.jpg',  password='password')
    user3 = User(
        email='elon@user.com', username='elon', profile_pic='https://i.imgur.com/O0c2yvu.jpg',  password='password')
    user4 = User(
        email='steve@user.com', username='steve', profile_pic='https://i.imgur.com/H4RVlaV.jpg',  password='password')
    user5 = User(
        email='james@user.com', username='james', profile_pic='https://i1.wp.com/hypebeast.com/image/2020/07/apple-memoji-update-headwear-masks-hairstyles-1.png',  password='password')
    user6 = User(
        email='gaby@user.com', username='gaby', profile_pic='https://i.pinimg.com/originals/52/09/c0/5209c0323b53ff0341481500715dbed2.png',  password='password')
    user7 = User(
        email='shouldi@user.com', username='shouldi', profile_pic='https://i.imgur.com/rlnSc3f.png',  password='password')
    demo = User(
        email='demo@user.com', username='demo', profile_pic='https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png',  password='password')


    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(demo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

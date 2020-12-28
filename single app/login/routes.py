from flask import Flask
from app import app
from login.models import user


@app.route('/',methods=[ 'POST' , 'GET'])
    user.signup()




@app.route('/profile', methods=['GET', 'POST'])

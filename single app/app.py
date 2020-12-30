from flask import Flask, render_template, url_for,request,redirect
from config import configurations
from config import configurationsv2
import pyrebase
import pymongo
import bcrypt
import time
#from subpro import givVal
#from login import routes 



firebsevar = pyrebase.initialize_app(config=configurations.config)
db = firebsevar.database()


login = pyrebase.initialize_app(config=configurationsv2.config)
log = login.database() 
auth = login.auth()

token = ""

app = Flask(__name__)


@app.route('/',methods=[ 'POST' , 'GET'])
def index():
    eu = "Incorrent Email or Password"
    ea = "Email is already registered"
    
    if request.method == 'POST':
        
        if  request.form['comment_id']=='0':
            
            email = request.form['login-email']
            password = request.form['login-pass']
                        
            try:
                auth.sign_in_with_email_and_password(email, password) 
                return redirect('/home')
            except:
                return render_template('Athenaeum.html', comment=eu)
            
        elif request.form['comment_id']=='1':
            
            email = request.form['register-email']
            password = request.form['register-pass']
        
            try:
                auth.create_user_with_email_and_password(email, password)
                time.sleep(3)
                auth.sign_in_with_email_and_password(email, password)
                time.sleep(3)
                return redirect('/profile')
            except:
                return render_template('Athenaeum.html', comment=ea)
    
    return render_template('Athenaeum.html')

@app.route('/profile', methods=['POST', 'GET'])
def Profile():
    if request.method == 'POST':
        first_name          = request.form['first_name']
        last_name           = request.form['last_name']
        area_code           = request.form['area_code']
        phone               = request.form['phone']
        p_name              = request.form['p_name']
        p_email             = request.form['p_email']
        p_phone             = request.form['p_phone']
        year                = request.form['year']
        subject             = request.form['subject']
        beg                 = request.form['rdiobtn']
        token= auth.current_user['localId']
        print(token)
        profile={"firstname":first_name, "lastname":last_name,"area_code":area_code,"phone":phone,"p_name":p_name,"p_email":p_email,"p_phone":p_phone,"year":year,"subject":subject,"beg":beg}                                                                            
        
        log.child(token).push(profile)
        return redirect('/home')
    
    return render_template('Profile.html')

@app.route('/home')
def home():
    return render_template('Home.html')

@app.route('/page-1')
def Page1():
    return render_template('Page-1.html')

@app.route('/page-2')
def Page2():
    return render_template('Page-2.html')

@app.route('/page-3')
def Page3():
    return render_template('Page-3.html')

@app.route('/streaming')
def streaming():
    return render_template('streaming.html')


@app.route('/page-4', methods=['POST', 'GET'])
def foo():
    t=0
    if request.method == 'POST':
        t=1
        first = request.form['first']
        second = request.form['second']
        third = request.form['third']
        
        ans = {"a1": first, "a2": second, "a3": third}
        db.child("/answers").push(ans)
        
    #k=givval()
    k=5
    if t==0:  
        return render_template('Page-4.html')
    else:
        return render_template('Page-4.html',kancha=k)


if __name__ == '__main__':
    app.run(debug=True)
    

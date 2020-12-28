from flask import Flask, render_template, url_for,request
import pyrebase
import configurations
import pymongo
import bcrypt
#from subpro import givVal
#from login import routes 



firebsevar = pyrebase.initialize_app(config=configurations.config)
db = firebsevar.database()

app = Flask(__name__)


@app.route('/',methods=[ 'POST' , 'GET'])
def index():
    return render_template('Athenaeum.html')

@app.route('/profile')
def Profile():
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
        result = db.child("/answers").push(ans)
        
    #k=givval()
    if t==0:  
        return render_template('Page-4.html')
    else:
        return render_template('Page-4.html',kancha=k)


if __name__ == '__main__':
    app.run(debug=True)
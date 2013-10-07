from flask import Flask, session, redirect, url_for, escape, request

app = Flask(__name__)

# Session is implemented on top of cookies for you and signs the cookies cryptographically.
# That means you can find a cookied name 'session' in the response.
# You can check this in the browser.
# The cookie is encrypted.
# Use os.urandom(24) to generage a secret key.
@app.route('/')
def index():
  if 'username' in session:
    return 'Logged in as %s' % escape(session['username'])
  #return 'You are not logged in'
  return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
  if request.method == 'POST':
    session['username'] = request.form['username']
    return redirect(url_for('index'))
  return '''
    <form action="" method="post">
      <p><input type=text name=username>
      <p><input type=submit value=Login>
    </form>
  '''

@app.route('/logout')
def logout():
  # remove the username from the session if it's there
  session.pop('username', None)
  return redirect(url_for('index'))

# set the secret key. keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

if __name__ == '__main__':
    
  app.run(host = '0.0.0.0', port = 80, debug = True)

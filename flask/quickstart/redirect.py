from flask import Flask
from flask import abort, redirect, url_for, make_response, render_template

app = Flask(__name__)

# Try
# curl -i -L http://localhost
# -L would follow the redirect indication
# -i would display the headers
@app.route('/')
def index():
  return redirect(url_for('login'))

@app.route('/login')
def login():
  abort(401)

@app.errorhandler(401)
def not_auth(error):
  resp = make_response(render_template('error_401.html'), 401)
  resp.headers['X-Something'] = 'A value'
  return resp

if __name__ == '__main__':
    
  app.run(host = '0.0.0.0', port = 80, debug = True)

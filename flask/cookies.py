from flask import Flask
from flask import make_response
from flask import render_template
from flask import request

app = Flask(__name__)

# Try
# curl http://localhost -i
# curl http://localhost -i -b username=abc
@app.route('/')
def index():
  username = request.cookies.get('username')
  if username is None:
    username = "default"
    resp = make_response(render_template('gogo.html', name = username))
    resp.set_cookie('username', username)
  else:
    resp = make_response(render_template('gogo.html', name = username))
  return resp

if __name__ == '__main__':
    
  app.run(host = '0.0.0.0', port = 80, debug = True)

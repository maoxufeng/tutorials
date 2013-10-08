from flask import Flask
from flask import request
from werkzeug import secure_filename

app = Flask(__name__)

# You should try catch KeyError
# or else, flask returns 400 Bad request
# Try
# curl http://localhost/login
# curl -d 'username=b' -d 'password=p' http://localhost/login
# curl -d 'username=b' -d 'password=p' http://localhost/login?query=ab
@app.route('/login', methods=['POST'])
def login():
  method = request.method
  username = request.form['username']
  password = request.form['password']
  query = request.args.get('query', 'defaultquery')
  return 'method : %s, username : %s, password : %s, query : %s\n' % (method, username, password, query)

# Try
# In browser
# http://localhost/static/upload.html
# Or use curl
# curl -F 'the_file=@hello.py;filename=abc' http://localhost/upload
# Note that we've tried quite a lot about how to use curl
# It seems like each -F holds a single file transfer
# So if you need upload two files, maybe you should use two -Fs
@app.route('/upload', methods=['POST'])
def upload_file():
  f = request.files['the_file']
  # for security issue, you should use secure_filename
  name = secure_filename(f.filename)
  f.save('uploaded_file.txt')
  return '%s upload succeeded' % name

if __name__ == '__main__':
    
  app.run(host = '0.0.0.0', port = 80, debug = True)

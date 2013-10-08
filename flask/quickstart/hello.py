from flask import Flask
from flask import url_for
from flask import render_template

# about the first argument, '__name__'
# the document says
# ==
# If you are using a single module (as in this example)
# you should use __name__ because depending on if it's started as application or imported as module
# the name will be different ('__main__' versus the actual import name).
# This is needed so that Flask knows where to look for templates, static files, and so on.
# ==
app = Flask(__name__)

# For example
# http://hostname
# by default, route only answter GET request, unless you set like
# @app.route('/login', methods=['GET', 'POST'])
@app.route('/')
def index():
  return 'Index page!'

# For example
# http://hostname/hello/abc
# http://hostname/hello gets 404
@app.route('/hello/<username>')
def hello(username):
  return 'Hello %s!' % username

# use <int:num> to limit the type of variable input as an integer
# if the variable can not be converted to an integer, the user would get a 404 page 
# For example
# http://hostname/integerecho/123
# http://hostname/integerecho/abc
@app.route('/integerecho/<int:num>')
def intecho(num):
  return 'Int : %d' % num

# the routes of projects and about are trying to explain how flask is dealing with trailing slash
# http://hostname/projects would get a 301 response, then it is redirected to http://hostname/projects/
@app.route('/projects/')
def projects():
  return 'The project page'

# http://hostname/about/ would get a 404
@app.route('/about')
def about():
  return 'The about page'

# http://hostname/urlgenerator
# url_for helps generating the user side request url
# For example
# In the 'hello' case, username is set as path parameter
# http://hostname/urlgenerator/hello
# /hello/John%20Doe
# In the 'about' case, username is set as query parameter
# http://hostname/urlgenerator/about
# /about?username=John+Doe
# The bad cases
# http://hostname/urlgenerator/urlgenerator
# http://hostname/urlgenerator/projects/
# http://hostname/urlgenerator/projects
@app.route('/urlgenerator/<path>')
def urlgenerator(path):
  with app.test_request_context():
    return url_for(path, username = 'John Doe')

# For example
# http://hostname/gogo/abc
@app.route('/gogo/')
@app.route('/gogo/<name>')
def gogo(name = None):
  return render_template('gogo.html', name = name)

if __name__ == '__main__':
    
  # in case you really need debug mode
  # it would print the stack trace on the page
  # and might cause security issues
  # while during development, it is quite helpful
  # the app detects and reloads the change automatically 
  app.run(host = '0.0.0.0', port = 80, debug = True)

  #app.run(host = '0.0.0.0', port = 80)

  # For static files,
  # simply create a directory named 'static'
  # and put files under static
  # then use http://hostname/static/filename to access the file
  # note that, you might need to figure out how to set MIME type 

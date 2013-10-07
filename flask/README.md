==
General
====

Follow Flask Documentation Release 0.10.1, June 14, 2013

==
Installation

install pip from scratch, refer to http://www.pip-installer.org/en/latest/installing.html

wget https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py

python ez_setup.py

wget https://raw.github.com/pypa/pip/master/contrib/get-pip.py

python get-pip.py

pip install --upgrade setuptools

pip install virtualenv

pip install flask

Note that, we use Python 2.6 for avoiding Python 3 compatability issue.

==
Quick Start, it is also a good tutorial for curl usage.

sudo python hello.py

hello.py

  shows how to start an app, set routes and templates, and how to serve static files as well.

dataexchange.py
  
  shows how to get method name, form and query parameters, and upload files using POST as well.

cookies.py

  shows how to fetch cookies from requests, and set new cookies.

redirect.py

  shows how to redirect the page, with a 401 error handler and a response header added.

sessions.py

  about cookie based session.

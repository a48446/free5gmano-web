@ECHO ON
set FLASK_ENV=development
set FLASK_APP=src/free5gmano.py
venv/Scripts/activate.bat
flask run -h localhost
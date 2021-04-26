from flask import Flask, request, jsonify
from flask_migrate import Migrate
from models import db, Logging

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/running'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
with app.app_context():
    db.create_all()
migrate = Migrate(app, db)

# competition_index = None

# @app.route('/logging', methods= ['POST'])
# def start_comp():
#     global competition_index
#     competition_index = request.get_json()['competition_index']
#     return 

@app.route('/logging', methods= ['POST'])
def handle_logging():
    try:
        data = request.get_json()
        new_logging = Logging(competition_index = 1 , gate_id = data['gate_id'], tag_number = data['tag_number'], timestamp = data['timestamp'])
        db.session.add(new_logging)
        db.session.commit()
        return jsonify({'message' : 'RECEIVED!!'}), 200
    except:
        return jsonify({'message' : 'FAILED!!'}), 400

if __name__ == "__main__":
    app.run(host = '0.0.0.0', debug = True)
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Logging(db.Model):
    __tablename__ = "logging"
    
    index = db.Column(db.Integer, primary_key = True)
    competition_index = db.Column(db.Integer, nullable = False)
    gate_id = db.Column(db.Integer, nullable = False)
    tag_number = db.Column(db.Text, nullable = False)
    timestamp = db.Column(db.Text, nullable = False)
    
    def __init__(self, competition_index, gate_id, tag_number, timestamp):
        self.gate_id = gate_id
        self.competition_index = competition_index
        self.tag_number = tag_number
        self.timestamp = timestamp

#flask 
        
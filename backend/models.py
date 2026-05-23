from datetime import datetime
from extensions import db

class JobScan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_text = db.Column(db.Text, nullable=False)
    prediction_score = db.Column(db.Float, nullable=False)
    prediction_label = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow) 
    is_flagged = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "text_snippet": self.job_text[:50] + "...",
            "full_text": self.job_text,
            "score": self.prediction_score,
            "label": self.prediction_label,
            "date": self.timestamp.isoformat(),
            "is_flagged": self.is_flagged
        }
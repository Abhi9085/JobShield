from flask import Blueprint, request, jsonify
from extensions import db
from models import JobScan
from utils.ml import predict_job_text

predict_bp = Blueprint('predict', __name__)

@predict_bp.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        combined_text = data.get("combined_text")

        if not combined_text:
            return jsonify({"error": "Please enter the job description."}), 400

        prediction_score, result = predict_job_text(combined_text)

        scan_id = None
        try:
            new_scan = JobScan(
                job_text=combined_text,
                prediction_score=prediction_score,
                prediction_label=result
            )
            db.session.add(new_scan)
            db.session.commit()
            scan_id = new_scan.id
        except Exception as db_error:
            print(f"Database Error: {db_error}")

        return jsonify({
            "result": result,
            "score": prediction_score,
            "scan_id": scan_id,
            "status": "success"
        })

    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({"error": str(e), "status": "failed"}), 500
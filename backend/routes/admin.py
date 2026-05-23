import calendar
from datetime import datetime
from flask import Blueprint, request, jsonify
from extensions import db
from models import JobScan

admin_bp = Blueprint('admin', __name__)

@admin_bp.route("/api/stats", methods=["GET"])
def get_stats():
    try:
        month_filter = request.args.get('month')
        query = JobScan.query

        if month_filter:
            year, month = map(int, month_filter.split('-'))
            start_dt = datetime(year, month, 1)
            _, last_day = calendar.monthrange(year, month)
            end_dt = datetime(year, month, last_day, 23, 59, 59)
            query = query.filter(JobScan.timestamp >= start_dt, JobScan.timestamp <= end_dt)

        return jsonify({
            "total_scans": query.count(),
            "fraud_count": query.filter_by(prediction_label="Fraudulent").count(),
            "legit_count": query.filter_by(prediction_label="Legitimate").count(),
            "flagged_count": query.filter_by(is_flagged=True).count()
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route("/api/history", methods=["GET"])
def get_history():
    try:
        month_filter = request.args.get('month')
        query = JobScan.query

        if month_filter:
            year, month = map(int, month_filter.split('-'))
            start_dt = datetime(year, month, 1)
            _, last_day = calendar.monthrange(year, month)
            end_dt = datetime(year, month, last_day, 23, 59, 59)
            query = query.filter(JobScan.timestamp >= start_dt, JobScan.timestamp <= end_dt)
            recent_scans = query.order_by(JobScan.timestamp.desc()).all()
        else:
            recent_scans = query.order_by(JobScan.timestamp.desc()).limit(50).all()

        return jsonify([scan.to_dict() for scan in recent_scans])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route("/api/admin/scans/<int:scan_id>/override", methods=["POST"])
def override_scan(scan_id):
    try:
        scan = JobScan.query.get(scan_id)
        if not scan: return jsonify({"error": "Not found"}), 404

        data = request.json
        if 'is_flagged' in data: scan.is_flagged = data['is_flagged']
        if 'label' in data: scan.prediction_label = data['label']

        db.session.commit()
        return jsonify({"message": "Success", "status": "success"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@admin_bp.route("/api/admin/scans/<int:scan_id>", methods=["DELETE"])
def delete_scan(scan_id):
    try:
        scan = JobScan.query.get(scan_id)
        if not scan: return jsonify({"error": "Not found"}), 404

        db.session.delete(scan)
        db.session.commit()
        return jsonify({"message": "Deleted", "status": "success"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@admin_bp.route("/api/flag/<int:scan_id>", methods=["POST"])
def flag_scan(scan_id):
    try:
        scan = JobScan.query.get(scan_id)
        if not scan:
            return jsonify({"error": "Scan not found"}), 404

        scan.is_flagged = True
        db.session.commit()
        return jsonify({"message": "Scan flagged successfully", "status": "success"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
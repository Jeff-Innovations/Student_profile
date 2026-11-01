"""
Jeff Innovations — personal & business site for Jephthah Ampadu Boateng.
Flask backend: serves the site and stores service requests in SQLite.
"""
from datetime import datetime
from functools import wraps

from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SECRET_KEY"] = "change-this-secret-key-before-deploying"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///jeff_innovations.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# ---------------------------------------------------------------------------
# Change this before you deploy. This gates the /admin page only.
# ---------------------------------------------------------------------------
ADMIN_PASSWORD = "jeffinnovations2026"


class ServiceRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    contact = db.Column(db.String(120), nullable=False)
    service = db.Column(db.String(80), nullable=False)
    message = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


def admin_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get("is_admin"):
            return redirect(url_for("admin_login"))
        return view(*args, **kwargs)
    return wrapped


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/request-service", methods=["POST"])
def request_service():
    name = request.form.get("name", "").strip()
    contact = request.form.get("contact", "").strip()
    service = request.form.get("service", "").strip()
    message = request.form.get("message", "").strip()

    if not name or not contact or not service:
        flash("Please fill in your name, contact, and choose a service.", "error")
        return redirect(url_for("home") + "#request")

    new_request = ServiceRequest(name=name, contact=contact, service=service, message=message)
    db.session.add(new_request)
    db.session.commit()

    flash("Thanks! Your request has been received — I'll reach out to you soon.", "success")
    return redirect(url_for("home") + "#request")


@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    if request.method == "POST":
        if request.form.get("password") == ADMIN_PASSWORD:
            session["is_admin"] = True
            return redirect(url_for("admin_dashboard"))
        flash("Wrong password.", "error")
    return render_template("admin_login.html")


@app.route("/admin/logout")
def admin_logout():
    session.pop("is_admin", None)
    return redirect(url_for("admin_login"))


@app.route("/admin")
@admin_required
def admin_dashboard():
    requests_list = ServiceRequest.query.order_by(ServiceRequest.created_at.desc()).all()
    return render_template("admin.html", requests=requests_list)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

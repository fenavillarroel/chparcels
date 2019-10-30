from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os


app = Flask(__name__)
app.config['SECRET_KEY'] = '9bdcb3380af008f90b23a5d1616bf319bc298105da20fe'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://chparcels:chile.,P2019@localhost:5432/chparcels'

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Cdr(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dst = db.Column(db.String(128), index=True,nullable=False)
    cid = db.Column(db.String(128), nullable=False)
    inicio = db.Column(db.DateTime(), nullable=False)
    fin = db.Column(db.DateTime(), nullable=False)
    answer = db.Column(db.DateTime(), nullable=True)
    dura = db.Column(db.Integer, nullable=False, default=0)
    bill = db.Column(db.Integer, nullable=False)
    disp = db.Column(db.String(28), nullable=False)
    acc = db.Column(db.String(28), nullable=False)
    audio = db.Column(db.String(256), nullable=True)


class CdrSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('id',
        			'dst',
        			'cid',
        			'inicio',
        			'fin',
        			'answer',
        			'dura',
        			'bill',
        			'disp',
        			'acc',
        			'audio')


cdr_schema = CdrSchema()
cdrs_schema = CdrSchema(many=True)

@app.route("/api", methods=["GET"])
def home():
    return "<p>Hello Api</api>"

# endpoint to get user detail by id
@app.route("/api/v1/llamadas/<num>", methods=["GET"])
def calls(num):
    call = Cdr.query.order_by(Cdr.id.desc()).filter(Cdr.dst==num).all()
    #call = Cdr.query.all()
    call = cdrs_schema.dump(call)
    return {"status":"success", "llamadas":call}, 200
    #return cdrs_schema.jsonify(call)

if __name__ == '__main__':
    app.run(debug=True)

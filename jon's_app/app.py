from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo

# Create an instance of Flask
app = Flask(__name__)

# TODO
# Use PyMongo to establish Mongo connection
# mongo = PyMongo(app, uri="mongodb://localhost:27017/weatherdata")
mongo = PyMongo(app, uri="mongodb://localhost:27017/USWeather")

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    #TODO - Retrieve real data from DB
    weather_data = {}
    weather_data['data'] = 'It sure is cold!'
    # Find one record of data from the mongo database
    weatherdata = mongo.db.collection.find_one()


    # Return template and data
    return render_template("index.html", weather_data=weather_data)

# TODO - Update routes below
@app.route('/<my_type>/data')
def db_data(my_type):

    db_data = mongo.db.collection.find({'YEAR': float(my_type)}, {'_id': False})
    print('this route was pinged')
    parsed = [x for x in db_data]
    print('parsed: ', parsed)
    return jsonify(parsed)

if __name__ == '__main__':
    app.run(debug=True)
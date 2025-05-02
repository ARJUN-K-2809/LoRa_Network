
from flask import Flask, render_template, jsonify,flash
from mqtt_client import start_mqtt, latest_data
import threading
import paho.mqtt.client as mqtt
import base64
import json
# import '' from mqtt_client
app = Flask(__name__)
app.secret_key = 'Lora'

latest_data = {'payload': 0.5}


mqtt_thread = threading.Thread(target=start_mqtt)
mqtt_thread.daemon = True
mqtt_thread.start()

from mqtt_client import latest_data

@app.route('/',methods=['POST','GET'])
def home():
    return render_template('home.html')

@app.route('/device-data')
def device_data():
    flash(latest_data['payload'])
    return render_template('device_data.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/get-latest-data')
def get_latest_data():
    # start_mqtt()
    return jsonify({'data': latest_data['payload']})

@app.route('/get-latest-number')
def get_latest_number():
    try:
        value = float(latest_data.get('payload', '0').split(':')[-1].strip())
    except:
        value = 0
    return jsonify({'value': value})

if __name__ == '__main__':
    # threading.Thread(target=start_mqtt).start()
    app.run(debug=True)

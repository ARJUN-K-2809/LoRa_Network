from flask import Flask, render_template, jsonify,flash # type: ignore
from mqtt_client import start_mqtt, latest_data
import threading
import paho.mqtt.client as mqtt
import base64
import json

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
    # flash(str(latest_data['payload']))
    return render_template('device_data.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/get-latest-data')
def get_latest_data():
    # start_mqtt()
    return jsonify({'end-node-3': latest_data['end-node-3'],'end-node-4': latest_data['end-node-4'],'end-node-5': latest_data['end-node-5']})

@app.route('/get-latest-number')
def get_latest_number():
    try:
        value = float(latest_data.get('payload', '0').split(':')[-1].strip())
    except:
        value = 0
    return jsonify({'value': value})

if __name__ == '__main__':
    app.run(debug=True)

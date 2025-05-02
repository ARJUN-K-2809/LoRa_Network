
import paho.mqtt.client as mqtt
import base64
import json

latest_data = {'payload': 'No data received yet'}

def start_mqtt():
    def on_connect(client, userdata, flags, reason_code, properties=None):
        print("Connected with result code", reason_code)
        client.subscribe("v3/imtestinglora@ttn/devices/end-node-3/up")

    def on_message(client, userdata, msg):
        data = json.loads(msg.payload)
        raw = data['uplink_message']['frm_payload']
        decoded = base64.b64decode(raw).decode()
        device_id = data['end_device_ids']['device_id']
        latest_data['payload'] = decoded
        print(latest_data)
        print(latest_data['payload'])
        return latest_data['payload']


    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    client.username_pw_set("imtestinglora@ttn", "NNSXS.5QWZFN22CZNYS3XUUJ2M54GS5NO3WICB4BC2ZLY.VB3P65UNXUYSKJXZNLYJOLRRZG2C3WO4G4V6PYPJHZ7EXUDB3ALQ")
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect("au1.cloud.thethings.network", 1883)
    client.loop_forever()

        # latest_data['payload'] = f"Received from {device_id}: {decoded}"
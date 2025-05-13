import paho.mqtt.client as mqtt
import base64
import json

latest_data = {}  # Dictionary to hold data from all devices

def start_mqtt():
    def on_connect(client, userdata, flags, reason_code, properties=None):
        print("Connected with result code", reason_code)
        # Use wildcard + to subscribe to all devices under the app
        client.subscribe("v3/imtestinglora@ttn/devices/+/up")

    def on_message(client, userdata, msg):
        try:
            data = json.loads(msg.payload)
            raw = data['uplink_message']['frm_payload']
            decoded = base64.b64decode(raw).decode()
            device_id = data['end_device_ids']['device_id']
            latest_data[device_id] = decoded  # Store decoded payload per device

            print(f"Data received from {device_id}: {decoded}")
            print("Latest data snapshot:", latest_data)

        except Exception as e:
            print("Error handling message:", e)

    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    client.username_pw_set("imtestinglora@ttn", "NNSXS.5QWZFN22CZNYS3XUUJ2M54GS5NO3WICB4BC2ZLY.VB3P65UNXUYSKJXZNLYJOLRRZG2C3WO4G4V6PYPJHZ7EXUDB3ALQ")
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect("au1.cloud.thethings.network", 1883)
    client.loop_forever()

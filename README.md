#  LoRa-Based Sensor Data Transmission System

This repository contains the complete source code and documentation for a LoRa-based system that transmits real-time sensor data from end nodes to a GUI via The Things Network (TTN) using the MQTT protocol. The system is designed for efficient remote monitoring using STM32 microcontrollers, LoRa-E5 modules, and a Flask-based dashboard.

---

# 1. About

The project aims to demonstrate end-to-end communication from LoRa end nodes (equipped with sensors) to a cloud-integrated GUI. The system leverages:
- **LoRa-E5 modules** for wireless long-range communication
- **STM32 microcontrollers** for sensor interfacing
- **The Things Network (TTN)** as the LoRaWAN network server
- **MQTT protocol** for data transmission
- **Flask web application** for real-time GUI and alerts

---

# 2. Installation

Follow the steps below to set up the development environment:

###  STM32 Setup
- Install [STM32CubeIDE](https://www.st.com/en/development-tools/stm32cubeide.html)
- Install ST-Link USB drivers
- Use STM32CubeMX to configure peripherals and generate code

### Arduino IDE (For User Firmware or Debugging)
- Install [Arduino IDE](https://www.arduino.cc/en/software)
- Install necessary board packages if using STM32 with Arduino

### Flask Backend

# Set up virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install flask
pip install -r requirements.txt 

# 3. Usage
3.1 Transmitting Sensor Data
Upload firmware to STM32 that collects data from:

Heart rate sensor
Sound sensor
Temperature sensor

The STM32 transmits the data every 5 seconds over LoRa to TTN.

3.2 GUI Visualization
The Flask app fetches MQTT messages from TTN’s MQTT broker.

Displays real-time readings and sends alerts when thresholds (e.g., > 100 bpm) are crossed.

# 4. Configuration
4.1 AT Firmware (Pre-built LoRa firmware)
Used to configure LoRa-E5 with AT commands (via serial)

Set DevEUI, AppEUI, AppKey using a terminal or serial monitor

4.2 User Firmware (STM32)
Custom firmware written in C (STM32CubeIDE) or Arduino

Responsible for:
Reading sensors
Encoding and sending payloads to LoRa module

# 5. License
This project is currently under development. The license will be updated soon. Please contact the contributors before use in commercial projects.

# 6. Contact
For queries, contact:
Nalan : 122201034@smail.iitpkd.ac.in
Arjun : 122301004@smail.iitpkd.ac.in

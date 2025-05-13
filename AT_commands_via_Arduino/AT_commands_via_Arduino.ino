#define USE_ARDUINO_INTERRUPTS true    // Set-up low-level interrupts for most acurate BPM math
#include <PulseSensorPlayground.h>     // Includes the PulseSensorPlayground Library

const int PulseWire = 0;       // 'S' Signal pin connected to A0

int Threshold = 550;           // Determine which Signal to "count as a beat" and which to ignore
PulseSensorPlayground pulseSensor;  // Creates an object

// int microphone_val;
// int temp_val ;
char message[19];
char def_message[19];
// String downlink;

int default_val = 0;


void setup() {

	pulseSensor.analogInput(PulseWire);   

	pulseSensor.setThreshold(Threshold);   

	// Double-check the "pulseSensor" object was created and began seeing a signal
	if (pulseSensor.begin()) {
		Serial.println("PulseSensor object created!");
	}
  // Initialize serial communication:
  Serial.begin(9600);
  Serial.println("Serial communication started.");
  
  // Send the AT commands once to configure the device:
  Serial.println("Sending AT commands...");
  delay(10000);

  Serial.write("AT");
  delay(10000);

  // Send each AT command with a short delay to ensure proper communication:
  Serial.write("AT+DR=US915");  // Set the data rate to US915
  delay(10000);  // Wait for a short time before sending the next command

  Serial.write("AT+ADR = OFF");  // Set the channel numbers
  delay(10000);
  Serial.write("AT+DR = 4"); // SET DATARATE
  delay(10000);
  
  Serial.write("AT+CH=NUM,8-15");  // Set the channel numbers
  delay(10000);

  Serial.write("AT+MODE=OTAA");  // Set the mode to OTAA (Over-the-Air Activation)
  delay(10000);
  Serial.write("AT+JOIN");  // Join the network
  delay(10000);  // Delay to ensure the commands are properly sent

  Serial.println("Join setup completed");
}

void loop() {

	int myBPM = pulseSensor.getBeatsPerMinute();      // Calculates BPM

	if (pulseSensor.sawStartOfBeat()) {               // Constantly test to see if a beat happened
    sprintf(message, "AT+MSG=H%d",myBPM);

		Serial.write(message);                        
		}
  else {
      sprintf(def_message, "AT+MSG=H%d", default_val);
      Serial.write(def_message);
    }

    delay(8000);  // Adding a delay to make the output more readable

}

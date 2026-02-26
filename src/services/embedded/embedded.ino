#include <WiFi.h>
#include <HTTPClient.h>
#include "secrets.h"

// ultrasonic sensor
struct sensor {
  int trigPin;
  int echoPin;
  unsigned long recentTriggerTime;
  float recentTriggerDistance;
  bool isTriggered;
};

// Represent colour value to flash on-board RGB LED
struct rgb {
  uint8_t r;
  uint8_t g;
  uint8_t b;
};

// Constants
const int DETECT_TRIGGER_DIST = 60;
const int RESET_TIME_MS = 500;
const rgb RED = {25, 0, 0};
const rgb GREEN = {0, 25, 0};
const rgb BLUE = {0, 0, 25};
const rgb YELLOW = {25, 25, 0};
const rgb PURPLE = {25, 0, 25};
const String ENDPOINT = "http://" + LOCAL_IP + ":8000/api/libraries/" + LIB_ID + "/";

// Sensors and HTTP
sensor sensorA = {5, 4, millis(), false};
sensor sensorB = {21, 20, millis(), false};
HTTPClient http;

// Send a square wave through pin to one of the sensors
void trigger(int pin) {
  digitalWrite(pin, LOW);
  delayMicroseconds(20);
  digitalWrite(pin, HIGH);
  delayMicroseconds(100);
  digitalWrite(pin, LOW);
}

// Flash the onboard LED with the passed in colour
void flash(rgb colour) {
#ifdef RGB_BUILTIN
  rgbLedWrite(RGB_BUILTIN, colour.r, colour.g, colour.b);
  delay(200);
  rgbLedWrite(RGB_BUILTIN, 0, 0, 0);
  delay(200);
#endif
}

// Convert a time for sound to bounce back to approximate distance in cm
float convertToCM(int ms) {
  return ms / 29.387 / 2;
}

// Decides the direction (order) in which the sensors were triggered,
// then flashes the corresponding LED colour and sends an HTTP request
void getDirection() {
  if (sensorA.recentTriggerTime < sensorB.recentTriggerTime) {
    // enter
    Serial.println("Enter");
    flash(PURPLE);
    send(true);
  } else {
    // exit
    Serial.println("Exit");
    flash(BLUE);
    send(false);
  }
}

// Sends an HTTP POST request to ENDPOINT
void send(bool isEnter) {
  // empty payload
  uint8_t *payload;
  // send POST to endpoint
  http.begin(ENDPOINT + (isEnter ? "1" : "-1"));  // Start connection
  int httpResponseCode = http.POST(payload, 0);  // Send POST request

  if (httpResponseCode == 204) {
    // success
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    flash(GREEN);
  } else {
    // error, serial out response for diagnostics
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
    String response = http.getString();
    Serial.println("Response:");
    Serial.println(response);
    flash(RED);
  }

  http.end();
}

// Setup pins and such
void setup() {
  // begin serial monitor at 115200 baud
  Serial.begin(115200);

  // initialize ultrasonic sensor pins
  pinMode(sensorA.trigPin, OUTPUT);
  pinMode(sensorA.echoPin, INPUT);
  pinMode(sensorB.trigPin, OUTPUT);
  pinMode(sensorB.echoPin, INPUT);

  // start WIFI as station (connect to a WIFI network)
  WiFi.mode(WIFI_STA);
  WiFi.begin(SSID, PASSWORD);
  Serial.print("Connecting...");

  // flash red and recheck connection every 500ms until connected
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    flash(RED);
    Serial.print(".");
  }
  // Connected, status flash LED
  Serial.println("\nConnected");
  flash(YELLOW);
  flash(YELLOW);
  flash(YELLOW);

  // Trigger sensor to get initial distance
  // square wave to first sensor
  trigger(sensorA.trigPin);
  // measure the pulse length from the echo pin
  sensorA.recentTriggerDistance = convertToCM(pulseIn(sensorA.echoPin, HIGH));

  // square wave to second sensor
  trigger(sensorB.trigPin);
  // measure the pulse length from the echo pin
  sensorB.recentTriggerDistance = convertToCM(pulseIn(sensorB.echoPin, HIGH));
}

// Run in perpetuity
void loop() {
  // To get distances from sensor reads
  float distanceA;
  float distanceB;
  int pulseLenMicrosecondsA;
  int pulseLenMicrosecondsB;

  // square wave to first sensor
  trigger(sensorA.trigPin);
  // measure the pulse length from the echo pin
  pulseLenMicrosecondsA = pulseIn(sensorA.echoPin, HIGH);

  // square wave to second sensor
  trigger(sensorB.trigPin);
  // measure the pulse length from the echo pin
  pulseLenMicrosecondsB = pulseIn(sensorB.echoPin, HIGH);

  // calculate the distance using the speed of sound
  distanceA = convertToCM(pulseLenMicrosecondsA);
  distanceB = convertToCM(pulseLenMicrosecondsB);

  // Check if a sensor detects a person
  bool currentSensorA = distanceA < DETECT_TRIGGER_DIST;
  bool currentSensorB = distanceB < DETECT_TRIGGER_DIST;

  // if the sensor has triggered after a certain amount of time
  if (currentSensorA && millis() - sensorA.recentTriggerTime > RESET_TIME_MS) {
    // set it to triggered, log time and check direction if both are triggered
    sensorA.isTriggered = true;
    sensorA.recentTriggerTime = millis();

    if (sensorA.isTriggered && sensorB.isTriggered) {
      getDirection();
      sensorA.isTriggered = false;
      sensorB.isTriggered = false;
    }
  }

  // if the sensor has triggered after a certain amount of time
  if (currentSensorB && millis() - sensorB.recentTriggerTime > RESET_TIME_MS) {
    // set it to triggered, log time and check direction if both are triggered
    sensorB.isTriggered = true;
    sensorB.recentTriggerTime = millis();

    if (sensorB.isTriggered && sensorA.isTriggered) {
      getDirection();
      sensorA.isTriggered = false;
      sensorB.isTriggered = false;
    }
  }

  // reset if time has expired
  if (sensorA.isTriggered && millis() - sensorA.recentTriggerTime > RESET_TIME_MS) {
    sensorA.isTriggered = false;
  }

  // reset if time has expired
  if (sensorB.isTriggered && millis() - sensorB.recentTriggerTime > RESET_TIME_MS) {
    sensorB.isTriggered = false;
  }

  delay(100);
}

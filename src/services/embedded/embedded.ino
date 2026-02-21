#include <WiFi.h>
#include <HTTPClient.h>
#include "secrets.h"

const int RED = 15;
const int YELLOW = 23;
const int GREEN = 22;
const int MS_BUFFER = 1000;
const int MAX_DIST_CM = 200;
const int DETECT_TRIGGER_DIST = 40;

struct sensor {
  int trigPin;
  int echoPin;
  unsigned long recentTriggerTime;
  unsigned long time2;
  float prevDist;
  float currDist;
  bool isTriggered;
};

sensor sensorA = {5, 4, millis(), millis(), MAX_DIST_CM, MAX_DIST_CM, false};
sensor sensorB = {21, 20, millis(), millis(), MAX_DIST_CM, MAX_DIST_CM, false};

WiFiClient client;
HTTPClient http;

const String serverUrl = "http://" + LOCAL_IP + ":8000/api/locations";

// the setup function runs once when you press reset or power the board
void setup() {
  Serial.begin(115200);
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(RED, OUTPUT);
  pinMode(GREEN, OUTPUT);
  pinMode(YELLOW, OUTPUT);
  pinMode(sensorA.trigPin, OUTPUT);
  pinMode(sensorA.echoPin, INPUT);
  pinMode(sensorB.trigPin, OUTPUT);
  pinMode(sensorB.echoPin, INPUT);

  WiFi.mode(WIFI_STA);
  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    flash(RED);
    Serial.println("Connecting...");
  }
  Serial.println("Connected");
  flash(YELLOW);
  flash(YELLOW);
  flash(YELLOW);

  Serial.println(WiFi.localIP());
}

void trigger(int pin) {
  digitalWrite(pin, LOW);
  delayMicroseconds(20);
  digitalWrite(pin, HIGH);
  delayMicroseconds(100);
  digitalWrite(pin, LOW);
}

void flash(int pin) {
  digitalWrite(pin, HIGH);  // turn the LED on (HIGH is the voltage level)
  delay(200);                      // wait for a second
  digitalWrite(pin, LOW);   // turn the LED off by making the voltage LOW
  delay(200); 
}

float convertToCM(int ms) {
  return ms / 29.387 / 2;
}

// the loop function runs over and over again forever
void loop() {

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

  if (currentSensorA && millis() - sensorA.recentTriggerTime > 2000) {
    sensorA.isTriggered = true;
    sensorA.recentTriggerTime = millis();
    if (sensorA.isTriggered && sensorB.isTriggered) {
      determineMotion();
    }
  }

  if (currentSensorB && millis() - sensorB.recentTriggerTime > 2000) {
    sensorB.isTriggered = true;
    sensorB.recentTriggerTime = millis();
    if (sensorB.isTriggered && sensorA.isTriggered) {
      determineMotion();
    }
  }

  if (millis() - sensorA.recentTriggerTime > 2000) {
    sensorA.isTriggered = false;
  }

  if (millis() - sensorB.recentTriggerTime > 2000) {
    sensorB.isTriggered = false;
  }

  delay(100);
}

void determineMotion() {
  if (sensorA.recentTriggerTime < sensorB.recentTriggerTime) {
    Serial.println("A before B");
    httpSend();
    flash(GREEN);
  } else {
    Serial.println("B before A");
    flash(RED);
  }
}

void httpSend() {
  http.begin(serverUrl);  // Start connection
  int httpResponseCode = http.GET();  // Send GET request

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    String response = http.getString();
    Serial.println("Response:");
    Serial.println(response);
    flash(GREEN);
    delay(1000);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
    flash(RED);
    delay(1000);
  }

  http.end();
}

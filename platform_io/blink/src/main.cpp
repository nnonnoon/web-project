#include <Arduino.h>
#define LED 2

void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
  Serial.println("Start");
}

void loop() {
  digitalWrite(LED, LOW);
  Serial.println("The green led id off");
  delay(1000);
  digitalWrite(LED, HIGH);
  Serial.println("The green led id on");
  delay(1000);
}
#include <esp_now.h>
#include <WiFi.h>

uint8_t broadcastAddress[] = {0x24, 0x0A, 0xC4, 0x9F, 0x50, 0xC0};

typedef struct struct_message {
    int id;
    String tag;
} struct_message;

struct_message myData;

int lap = 0;
String arr[] = {"aa", "bb", "cc", "00"};
int count = 0;

void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status){
  Serial.print("Packet Send Status: ");
  if(status == ESP_NOW_SEND_SUCCESS){
    Serial.println("Delivery Success");
  }else{
    Serial.println("Delivery Fail");
  }
}

void setup(){
    Serial.begin(9600);
    WiFi.mode(WIFI_STA);
    Serial.print("MAC address: ");
    String macAddress = WiFi.macAddress();
    Serial.println(macAddress);

    if (esp_now_init() != ESP_OK) {
      Serial.println("Error initializing ESP-NOW");
      return;
    }

    esp_now_register_send_cb(OnDataSent);

    esp_now_peer_info_t peerInfo;
    memcpy(peerInfo.peer_addr, broadcastAddress, 6);
    peerInfo.channel = 0;
    peerInfo.encrypt = false;

    if (esp_now_add_peer(&peerInfo) != ESP_OK){
      Serial.println("Failed to add peer");
      return;
    }
}

void loop(){
  if(lap > 5){
    return;
  }
  String str = "";
  String tag = "";
  if (count < 10){
    str = '0' + String(count);
  }else{
    str = String(count);
  }
  myData.id = 2;
  arr[3] = str;
  for (int i = 0 ; i < 4; i++){
      tag = tag + arr[i];
  }
  Serial.print(tag);
  myData.tag = tag;
  esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *) &myData, sizeof(myData));

  if (result == ESP_OK) {
    Serial.println("Sent with success");
  }
  else {
    Serial.println("Error sending the data");
  }
  lap++;
  count++;
}
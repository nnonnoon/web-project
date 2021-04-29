#include <esp_now.h>
#include <WiFi.h>


typedef struct struct_message {
  int id;
  String tag;
}struct_message;

struct_message myData;
struct_message board_1;
struct_message board_2;

struct_message boardsStruct[2] = {board_1, board_2};


void OnDataRecv(const uint8_t * mac_addr, const uint8_t *incomingData, int len){
  char macStr[18];
  snprintf(macStr, sizeof(macStr), "%02x:%02x:%02x:%02x:%02x:%02x",
           mac_addr[0], mac_addr[1], mac_addr[2], mac_addr[3], mac_addr[4], mac_addr[5]);

  memcpy(&myData, incomingData, sizeof(myData));

  boardsStruct[myData.id-1].id = myData.id;
  boardsStruct[myData.id-1].tag = myData.tag;
  Serial.printf("%x,", boardsStruct[myData.id-1].id);
  Serial.println(boardsStruct[myData.id-1].tag);
}

void setup(){
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);

  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }

  esp_now_register_recv_cb(OnDataRecv);
}

void loop() {
}
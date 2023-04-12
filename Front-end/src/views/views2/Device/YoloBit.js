import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const YoloBit = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/device/Yolobit.png")}
      />
      <Text style={styles.title}>Hình ảnh mạch YoloBit</Text>
      <Text style={styles.description}>
        Trên bộ Kit học STEM Yolo:Bit có tích hợp nhiều bộ phận như: 25 đèn LED
        đa màu, được sắp xếp theo ma trận vuông 5 x 5.{"\n"}2 nút nhấn A, B để
        tương tác.{"\n"}
        Cảm biến ánh sáng.{"\n"}
        Cảm biến nhiệt độ và độ ẩm.{"\n"}
        Cảm biến gia tốc để đo góc nghiêng và hướng chuyển động.{"\n"}
        Loa phát nhạc.{"\n"}
      </Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>Kích thước</Text>
          <Text style={styles.value}>4cm x 5 cm</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>RAM</Text>
          <Text style={styles.value}>8MB</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Flash memory</Text>
          <Text style={styles.value}>4MB</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Bluetooth</Text>
          <Text style={styles.value}>BT4.2 BR/EDR and BLE</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>CPU</Text>
          <Text style={styles.value}>Dual-core 32bit Xtensa LX6</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>WIFI</Text>
          <Text style={styles.value}>802.11 b/g/n/e/i</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderColor: "#000",
    borderWidth: 1.5,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    textAlign: "right",
  },
});
export default YoloBit;

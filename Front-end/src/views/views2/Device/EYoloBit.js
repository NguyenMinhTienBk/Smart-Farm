import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const EYoloBit = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/device/EYolobit.png")}
      />
      <Text style={styles.title}>Hình ảnh mạch mở rộng YoloBit</Text>
      <Text style={styles.description}>
        Grove shield là shield mở rộng tương thích với Yolo:Bit, giúp mở rộng
        thêm 9 port kết nối chuẩn grove để bạn dễ dàng kết nối Yolo:Bit với các
        cảm biến bên ngoài.
      </Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>Khe cắm đa dụng một tín hiệu</Text>
          <Text style={styles.value}>P0, P1 và P2</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Khe cắm hai tín hiệu</Text>
          <Text style={styles.value}>P16/12, P14/15, P10/13, P3/6</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Khe giao tiếp I2C</Text>
          <Text style={styles.value}>I2C1 và I2C2, cùng là chân P19/20</Text>
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
export default EYoloBit;

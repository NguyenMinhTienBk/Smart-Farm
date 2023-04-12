import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Humidity = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/device/Humidity.png")}
      />
      <Text style={styles.title}>Hình ảnh cảm biến độ ẩm đất</Text>
      <Text style={styles.description}>
        Cảm biến độ ẩm đất Soil Moisture Sensor thường được sử dụng trong các mô
        hình tưới nước tự động, vườn thông minh,…, Đây là cảm biến giúp xác định
        độ ẩm của đất và trả về giá trị Analog
      </Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>Điện áp làm việc</Text>
          <Text style={styles.value}>3.3V</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sử dụng chip</Text>
          <Text style={styles.value}>LM393</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Kích thước module</Text>
          <Text style={styles.value}>48mm x 24 mm x 18mm (DxRxC)</Text>
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
export default Humidity;

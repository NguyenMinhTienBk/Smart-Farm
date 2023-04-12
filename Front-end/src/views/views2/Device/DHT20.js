import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const DHT20 = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/device/DHT20.png")}
      />
      <Text style={styles.title}>Hình ảnh DHT20</Text>
      <Text style={styles.description}>
        Cảm biến nhiệt độ và độ ẩm DHT20 sử dụng giao thức đầu ra là I2C. Cảm
        biến có độ chính xác cao, giá thành thấp, thích hợp với các ứng dụng cần
        đo nhiệt độ,độ ẩm của môi trường. {"\n"}
        {"\n"}Ứng dụng: Bạn có thể ứng dụng cảm biến này vào các dự án điều
        khiển tự động, ghi nhận dữ liệu về nhiệt độ, độ ẩm trong môi trường xung
        quanh, làm máy hút ẩm… và nhiều dự án khác.
      </Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>Điện áp đầu vào</Text>
          <Text style={styles.value}>3.3V</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Đo phạm vi độ ẩm</Text>
          <Text style={styles.value}>0 ~ 100% RH</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dải nhiệt độ đo</Text>
          <Text style={styles.value}>-40 ~ + 80 ℃</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Độ chính xác độ ẩm</Text>
          <Text style={styles.value}>± 3% RH (25 ℃)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Độ chính xác nhiệt độ</Text>
          <Text style={styles.value}>± 0,5 ℃</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tín hiệu đầu ra</Text>
          <Text style={styles.value}>Tín hiệu I2C</Text>
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
export default DHT20;

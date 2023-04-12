import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Light = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/device/Light.png")}
      />
      <Text style={styles.title}>Hình ảnh DHT20</Text>
      <Text style={styles.description}>
        Cảm biến ánh sáng là thiết bị giúp nhận biết và phát hiện cường độ ánh
        sáng của môi trường xung quanh. Cảm biến này thích hợp để làm các ứng
        dụng cơ bản về nhận biết ánh sáng, biết được trời sáng hay trời tối và
        nhiều ứng dụng thú vị khác.
      </Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>Điện áp hoạt động</Text>
          <Text style={styles.value}>3.3V</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dòng cung cấp</Text>
          <Text style={styles.value}>0.5-3mA</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Điện trở quang</Text>
          <Text style={styles.value}>GL5528</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Điện trở khi có ánh sáng</Text>
          <Text style={styles.value}>20KΩ</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Thời gian phản hồi</Text>
          <Text style={styles.value}>20-30 secs</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Bước sóng tối đa</Text>
          <Text style={styles.value}>540 nm</Text>
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
export default Light;

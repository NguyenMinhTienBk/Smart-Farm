import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import client from "../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditUser = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy giá trị email từ AsyncStorage
        const email = await AsyncStorage.getItem("email");
        // Gọi API với email lấy được từ AsyncStorage
        const response = await client.get(`/get-user/${email}`);
        // Lấy dữ liệu trả về từ API và cập nhật vào state tasks
        setFullname(response.data.fullname);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <View style={styles.item}>
        <Text style={styles.item1}>Họ và tên:</Text>
        <Text style={styles.item2}>{fullname}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.item1}>Số điện thoại:</Text>
        <Text style={styles.item2}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  item1: {
    flex: 1,
    fontSize: 16,
    paddingTop: 20,
  },
  item2: {
    flex: 2,
    fontSize: 16,
    paddingTop: 20,
  },
});

export default EditUser;

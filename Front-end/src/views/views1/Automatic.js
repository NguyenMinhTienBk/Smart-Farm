import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import client from "../../api/client";

export default function Automatic() {
  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedSystem, setSelectedSystem] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    retrieveEmail();
    getDataFromBackend();
  }, []);

  const getDataFromBackend = async () => {
    try {
      const email = await AsyncStorage.getItem("email");
      const response = await client.get(`/get-tree-system/${email}`);
      // Kiểm tra xem email từ AsyncStorage có trùng với email từ backend hay không
      if (email === response.data.email) {
        setSelectedPlant(response.data.selectedPlant);
        setSelectedSystem(response.data.selectedSystem);
      } else {
        setSelectedPlant(null); // Nếu không trùng thì set selectedPlant là null
        setSelectedSystem(null); // Nếu không trùng thì set selectedSystem là null
      }
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveEmail = async () => {
    try {
      const value = await AsyncStorage.getItem("email"); // Thay "email" bằng khóa lưu trữ dữ liệu email của bạn
      if (value !== null) {
        setEmail(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlantSelection = (value) => {
    setSelectedPlant(value);
  };

  const handleSystemSelection = (value) => {
    setSelectedSystem(value);
  };

  const handleSave = async () => {
    try {
      // Kiểm tra dữ liệu có tồn tại trong MongoDB hay không
      const response = await client.get(`/get-tree-system/${email}`);
      const tree = response.data;
      if (tree) {
        // Nếu đã tồn tại dữ liệu, thực hiện gọi API update
        await client.put(`/update-tree-system/${email}`, {
          selectedPlant: selectedPlant,
          selectedSystem: selectedSystem,
        });
        ToastAndroid.show("Cập nhật thành công!", ToastAndroid.SHORT);
      } else {
        // Nếu chưa tồn tại dữ liệu, thực hiện gọi API create
        await client.post("/create-tree-system", {
          selectedPlant: selectedPlant,
          selectedSystem: selectedSystem,
          email: email,
        });
        ToastAndroid.show("Lưu thay đổi thành công!", ToastAndroid.SHORT);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Nếu nhận được lỗi 404, thực hiện gọi API create
        await client.post("/create-tree-system", {
          selectedPlant: selectedPlant,
          selectedSystem: selectedSystem,
          email: email,
        });
        ToastAndroid.show("Lưu thay đổi thành công!", ToastAndroid.SHORT);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>1. Chọn loại cây cần tưới:</Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioItem}>
          <TouchableOpacity
            style={
              selectedPlant === "Cải bắp" ? styles.radioSelected : styles.radio
            }
            onPress={() => handlePlantSelection("Cải bắp")}
          >
            <Text style={styles.radioText}>Cải bắp</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.radioItem}>
          <TouchableOpacity
            style={
              selectedPlant === "Cây xoài" ? styles.radioSelected : styles.radio
            }
            onPress={() => handlePlantSelection("Cây xoài")}
          >
            <Text style={styles.radioText}>Cây xoài</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.radioItem}>
          <TouchableOpacity
            style={
              selectedPlant === "Cây táo" ? styles.radioSelected : styles.radio
            }
            onPress={() => handlePlantSelection("Cây táo")}
          >
            <Text style={styles.radioText}>Cây táo</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.question}>2. Chọn hệ thống tưới:</Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioItem2}>
          <TouchableOpacity
            style={
              selectedSystem === "Hệ thống tưới nhỏ giọt"
                ? styles.radioSelected
                : styles.radio
            }
            onPress={() => handleSystemSelection("Hệ thống tưới nhỏ giọt")}
          >
            <Text style={styles.radioText}>Hệ thống tưới nhỏ giọt</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.radioItem2}>
          <TouchableOpacity
            style={
              selectedSystem === "Hệ thống tưới phun sương"
                ? styles.radioSelected
                : styles.radio
            }
            onPress={() => handleSystemSelection("Hệ thống tưới phun sương")}
          >
            <Text style={styles.radioText}>Hệ thống tưới phun sương</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.radioItem2}>
          <TouchableOpacity
            style={
              selectedSystem === "Hệ thống tưới cỏ"
                ? styles.radioSelected
                : styles.radio
            }
            onPress={() => handleSystemSelection("Hệ thống tưới cỏ")}
          >
            <Text style={styles.radioText}>Hệ thống tưới cỏ</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Thiết lập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D47",
    padding: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  radioContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  radioItem: {
    width: 150,
    marginVertical: 8,
  },
  radioItem2: {
    width: 250,
    marginVertical: 8,
  },
  radio: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  radioSelected: {
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: "green",
  },
  radioText: {
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    alignSelf: "stretch",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});

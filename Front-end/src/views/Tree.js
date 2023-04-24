import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../api/client";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

export default function Tree() {
  useEffect(() => {
    const getEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("email");
        setEmail(email);
      } catch (error) {
        console.error("Error getting email from AsyncStorage:", error);
      }
    };
    getEmail();
  }, []);
  const navigation = useNavigation();
  const handleManualList = async () => {
    try {
      const response = await client.post(
        "/create-tree",
        {
          treeName,
          selectedDate,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        navigation.navigate("TreeList");
      } else {
        Alert.alert("Lỗi", "Không thể gửi dữ liệu. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [treeName, setTreeName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateSelect = (event, date) => {
    if (date) {
      setSelectedDate(date);
      setShowPicker(Platform.OS === "ios");
    } else {
      setShowPicker(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.treeName}>
        <Text style={styles.question}>Tên Cây: </Text>
        <TextInput
          style={styles.input}
          value={treeName}
          onChangeText={(text) => setTreeName(text)}
          placeholder="Nhập tên cây ..."
          placeholderTextColor="#999"
          fontSize={17}
        />
      </View>
      <View style={styles.setDateANDsetTime}>
        <Text style={styles.question}>Ngày trồng</Text>
        <View style={styles.part}>
          <TextInput
            editable={false}
            style={styles.input}
            placeholder="Select date"
            value={selectedDate.toLocaleDateString("vi-VN")}
          />
          <TouchableOpacity
            style={[styles.icon, { marginLeft: 12 }]}
            onPress={() => setShowPicker(true)}
          >
            <Foundation name="calendar" size={35} color="white" />
          </TouchableOpacity>
        </View>

        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateSelect}
          />
        )}
      </View>

      <View style={styles.doneCheckbox}>
        <TouchableOpacity onPress={handleManualList}>
          <MaterialIcons
            style={styles.checkboxDone}
            name="done"
            size={50}
            color="#427ef5"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1F1D47",
  },
  part: {
    flexDirection: "row",
  },
  icon: {
    marginTop: 20,
    marginLeft: 10,
  },
  input: {
    width: "90%",
    fontSize: 20,
    color: "white",
    padding: 5,
    marginBottom: 30,
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  input1: {
    width: "90%",
    fontSize: 20,
    color: "white",
    padding: 5,
    marginBottom: 30,
    border: "none",
  },
  question: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#00B2FF",
  },
  button: {
    backgroundColor: "#00B2FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  repeatWrapper: {
    flexDirection: "row",
  },
  list: {
    backgroundColor: "#2C2A4C",
    borderRadius: 5,
    position: "absolute",
    top: 300,
    left: 0,
    right: 0,
    // bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    color: "white",
    padding: 10,
  },
  doneCheckbox: {
    width: 70,
    height: 70,
    backgroundColor: "#21a3d0",
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",

    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: "#eff7f8",
  },
  checkboxDone: {
    fontSize: 40,
    color: "#FFFFFF",
  },
});

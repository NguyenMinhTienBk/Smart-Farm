import React, { useState, useEffect } from "react";
import { ToastAndroid } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WateringForm() {
  const [amount, setAmount] = useState("");
  const [selectedSystem, setSelectedSystem] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const amountValue = await AsyncStorage.getItem("amount");
        const systemValue = await AsyncStorage.getItem("system");
        const timeValue = await AsyncStorage.getItem("time");
        if (amountValue !== null) {
          setAmount(amountValue);
        }
        if (systemValue !== null) {
          setSelectedSystem(systemValue);
        }
        if (timeValue !== null) {
          setTime(timeValue);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem("amount", amount);
      await AsyncStorage.setItem("system", selectedSystem);
      await AsyncStorage.setItem("time", time);
      ToastAndroid.show("Lưu thay đổi thành công !", ToastAndroid.SHORT);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSystemSelection = (value) => {
    setSelectedSystem(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>1. Nhập lượng nước cần tưới:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      <Text style={styles.question}>2. Chọn hệ thống tưới:</Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioItem2}>
          <TouchableOpacity
            style={
              selectedSystem === "Drip irrigation system"
                ? styles.radioSelected
                : styles.radio
            }
            onPress={() => handleSystemSelection("Drip irrigation system")}
          >
            <Text style={styles.radioText}>Hệ thống tưới nhỏ giọt</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.radioItem2}>
          <TouchableOpacity
            style={
              selectedSystem === "Sprinkler irrigation system"
                ? styles.radioSelected
                : styles.radio
            }
            onPress={() => handleSystemSelection("Sprinkler irrigation system")}
          >
            <Text style={styles.radioText}>Hệ thống tưới phun sương</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.radioItem2}>
          <TouchableOpacity
            style={
              selectedSystem === "Lawn irrigation system"
                ? styles.radioSelected
                : styles.radio
            }
            onPress={() => handleSystemSelection("Lawn irrigation system")}
          >
            <Text style={styles.radioText}>Hệ thống tưới cỏ</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.question}>3. Thiết lập thời gian:</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={time}
          onValueChange={(itemValue) => setTime(itemValue)}
        >
          <Picker.Item label="0:00 AM" value="0:00 AM" />
          <Picker.Item label="1:00 AM" value="1:00 AM" />
          <Picker.Item label="2:00 AM" value="2:00 AM" />
          <Picker.Item label="3:00 AM" value="3:00 AM" />
          <Picker.Item label="4:00 AM" value="4:00 AM" />
          <Picker.Item label="5:00 AM" value="5:00 AM" />
          <Picker.Item label="6:00 AM" value="6:00 AM" />
          <Picker.Item label="7:00 AM" value="7:00 AM" />
          <Picker.Item label="8:00 AM" value="8:00 AM" />
          <Picker.Item label="9:00 AM" value="9:00 AM" />
          <Picker.Item label="10:00 AM" value="10:00 AM" />
          <Picker.Item label="11:00 AM" value="11:00 AM" />
          <Picker.Item label="12:00 AM" value="12:00 AM" />
          <Picker.Item label="1:00 PM" value="1:00 PM" />
          <Picker.Item label="2:00 PM" value="2:00 PM" />
          <Picker.Item label="3:00 PM" value="3:00 PM" />
          <Picker.Item label="4:00 PM" value="4:00 PM" />
          <Picker.Item label="5:00 PM" value="5:00 PM" />
          <Picker.Item label="6:00 PM" value="6:00 PM" />
          <Picker.Item label="7:00 PM" value="7:00 PM" />
          <Picker.Item label="8:00 PM" value="8:00 PM" />
          <Picker.Item label="9:00 PM" value="9:00 PM" />
          <Picker.Item label="10:00 PM" value="10:00 PM" />
          <Picker.Item label="11:00 PM" value="11:00 PM" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.radioText}>Thiết lập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1F1D47",
  },

  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 30,
    backgroundColor: "#fff",
    color: "red",
    fontSize: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    color: "#fff",
  },
  radioContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 30,
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
    backgroundColor: "blue",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  dropdown: {
    borderColor: "#fff",
    borderWidth: 2,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
});

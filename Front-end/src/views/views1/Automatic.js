import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

export default function Automatic() {
  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedSystem, setSelectedSystem] = useState("");

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const value1 = await AsyncStorage.getItem("selectedPlant");
      const value2 = await AsyncStorage.getItem("selectedSystem");
      if (value1 !== null) {
        setSelectedPlant(value1);
      }
      if (value2 !== null) {
        setSelectedSystem(value2);
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
      await AsyncStorage.setItem("selectedPlant", selectedPlant);
      await AsyncStorage.setItem("selectedSystem", selectedSystem);
      ToastAndroid.show("Lưu thay đổi thành công !", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>1. Chọn loại cây cần tưới:</Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioItem}>
          <TouchableOpacity
            style={
              selectedPlant === "Cabbage" ? styles.radioSelected : styles.radio
            }
            onPress={() => handlePlantSelection("Cabbage")}
          >
            <Text style={styles.radioText}>Cải bắp</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.radioItem}>
          <TouchableOpacity
            style={
              selectedPlant === "Mango tree"
                ? styles.radioSelected
                : styles.radio
            }
            onPress={() => handlePlantSelection("Mango tree")}
          >
            <Text style={styles.radioText}>Cây xoài</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.radioItem}>
          <TouchableOpacity
            style={
              selectedPlant === "Apple tree"
                ? styles.radioSelected
                : styles.radio
            }
            onPress={() => handlePlantSelection("Apple tree")}
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

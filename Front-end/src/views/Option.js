import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Option = () => {
  const navigation = useNavigation();

  const handleFarmer = () => {
    navigation.navigate("HomeView1");
  };

  const handleFarmer2 = () => {
    navigation.navigate("HomeView2");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn chế độ</Text>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={handleFarmer}>
          <Text style={styles.buttonText}>Người nông dân</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleFarmer2}>
          <Text style={styles.buttonText}>Kỹ sư nông nghiệp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1F1D47",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "stretch",
    flex: 2,
    marginTop: 50,
    color: "#fff",
  },
  content: {
    flex: 4,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 4,
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "#29B6F6",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Option;

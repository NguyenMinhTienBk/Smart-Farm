import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import Task from "./Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../api/client";
export default function TreeList() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy giá trị email từ AsyncStorage
        const email = await AsyncStorage.getItem("email");
        // Gọi API với email lấy được từ AsyncStorage
        const response = await client.get(`/get-tree/${email}`);
        // Lấy dữ liệu trả về từ API và cập nhật vào state tasks
        setTasks(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);

  const handleManual = () => {
    navigation.navigate("Tree");
  };
  const updateTasks = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  const handleDeleteTask = async (taskId) => {
    try {
      await client.delete(`/delete-tree/${taskId}`);
      updateTasks(taskId);
    } catch (error) {
      console.error(error);
    }
  };

  const formatSelectedDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            treeName={task.treeName}
            selectedDate={formatSelectedDate(task.selectedDate)}
            count={index + 1}
            taskId={task.id}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </ScrollView>
      <TouchableOpacity onPress={handleManual}>
        <View style={styles.IconWrapper}>
          <Text style={styles.icon}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,

    backgroundColor: "#1F1D47",
  },
  header: {
    marginBottom: 15,
  },

  headerText1: {
    marginBottom: 20,
    color: "#FFFFFF",
    fontSize: 17,
  },
  IconWrapper: {
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
  icon: {
    fontSize: 40,
    color: "#FFFFFF",
  },
});

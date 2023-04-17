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
import client from "../../api/client";
export default function ManualList() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy giá trị email từ AsyncStorage
        const email = await AsyncStorage.getItem("email");
        // Gọi API với email lấy được từ AsyncStorage
        const response = await client.get(`/get-value-manual/${email}`);
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
    navigation.navigate("ManualView2");
  };

  // Hàm để định dạng ngày theo định dạng dd-mm-yyyy
  const formatSelectedDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
  };

  // Hàm để định dạng giờ theo định dạng hh:mm
  const formatSelectedHour = (hour) => {
    const d = new Date(hour);
    const minutes = d.getMinutes();
    const hours = d.getHours();
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  };

  // Hàm để so sánh thời gian của hai công việc
  const compareTasksByTime = (task1, task2) => {
    const date1 = new Date(task1.selectedDate);
    const date2 = new Date(task2.selectedDate);
    const hour1 = new Date(task1.selectedHour);
    const hour2 = new Date(task2.selectedHour);

    // So sánh ngày
    if (date1 < date2) {
      return -1;
    }
    if (date1 > date2) {
      return 1;
    }

    // Nếu ngày bằng nhau, tiếp tục so sánh giờ
    if (hour1 < hour2) {
      return -1;
    }
    if (hour1 > hour2) {
      return 1;
    }

    return 0;
  };

  // Sắp xếp danh sách công việc theo thời gian gần nhất đến xa nhất
  const sortedTasks = [...tasks].sort(compareTasksByTime);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Danh sách lịch tưới</Text>
        <Text style={styles.headerText1}>
          bạn có {sortedTasks.length} danh sách lịch tưới ngày hôm nay !
        </Text>
      </View>
      <ScrollView>
        {sortedTasks.map((task, index) => (
          <Task
            key={index}
            waterAmount={task.waterAmount}
            selectedDate={formatSelectedDate(task.selectedDate)} // Sử dụng hàm formatSelectedDate để định dạng ngày
            selectedHour={formatSelectedHour(task.selectedHour)} // Sử dụng hàm formatSelectedHour để định dạng giờ
            count={index + 1}
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
    paddingTop: 80,
    paddingHorizontal: 20,

    backgroundColor: "#1F1D47",
  },
  header: {
    marginBottom: 15,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  headerText1: {
    color: "#FFFFFF",
    fontSize: 17,
    opacity: 0.5,
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

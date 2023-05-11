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
    navigation.navigate("ManualView1");
  };
  const updateTasks = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  const handleDeleteTask = async (taskId) => {
    try {
      // Gọi API để xóa task với id được truyền vào
      await client.delete(`/delete-task/${taskId}`);
      // Cập nhật lại danh sách tasks trong state của component cha (ManualList)
      // Bạn có thể truyền hàm này từ component cha (ManualList) vào component con (Task) thông qua props
      // và gọi nó ở đây để cập nhật lại danh sách tasks sau khi xóa
      updateTasks(taskId);
    } catch (error) {
      console.error(error);
    }
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
      <Text style={styles.headerText1}>
        bạn có {sortedTasks.length} danh sách lịch tưới ngày hôm nay !
      </Text>

      <ScrollView>
        {sortedTasks.map((task, index) => (
          <Task
            key={task.id}
            waterAmount={task.waterAmount}
            time={task.time}
            selectedDate={formatSelectedDate(task.selectedDate)} // Sử dụng hàm formatSelectedDate để định dạng ngày
            selectedHour={formatSelectedHour(task.selectedHour)} // Sử dụng hàm formatSelectedHour để định dạng giờ
            count={index + 1}
            taskId={task.id} // Truyền taskId vào để xóa task
            handleDeleteTask={handleDeleteTask} // Truyền hàm xóa task vào
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

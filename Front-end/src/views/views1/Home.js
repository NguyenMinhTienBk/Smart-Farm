import React, { useState, useEffect } from "react";
import rain from "../../../assets/weather/rain.png";
import sun from "../../../assets/weather/sun.png";
import sunrain from "../../../assets/weather/sunrain.png";
import cloud from "../../../assets/weather/cloud.png";
import TabBar from "../../components/TabBar";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import client from "../../api/client";

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [setPump, setSetPump] = useState(0);
  const [setPump1, setSetPump1] = useState(0);
  const [buttonPump, setButtonPump] = useState("Bật máy bơm");
  const [buttonText, setButtonText] = useState("Tưới 1");
  const [setPump2, setSetPump2] = useState(0);
  const [buttonText2, setButtonText2] = useState("Tưới 2");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [light, setLight] = useState(null);
  const [soilmoisture, setSoilMoisture] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [tree, setTree] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dữ liệu thời tiết
        const weatherResponse = await fetch(
          "https://api.openweathermap.org/data/2.5/forecast?q=Ho%20Chi%20Minh&units=metric&appid=05e89b040c9ca6ccc33fbdd46c4c3272"
        );
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);

        // Fetch dữ liệu thiết bị
        const deviceResponse = await fetch(
          "https://demo.thingsboard.io/api/plugins/telemetry/DEVICE/1e296570-c966-11ed-b62c-7d8052ad39cf/values/timeseries?keys=temperature%2Chumidity%2Clight%2Csoilmoisture",
          {
            headers: {
              "X-Authorization":
                "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aWVuLm5ndXllbm1pbmh0aWVuMjYwOTAyQGdtYWlsLmNvbSIsInVzZXJJZCI6ImIwYzRiN2EwLWM5NDItMTFlZC1iNjJjLTdkODA1MmFkMzljZiIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwic2Vzc2lvbklkIjoiYzgxNWRmOTgtMWQxYS00MDBmLTlhNDAtODM1MDhjZWViYTNmIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2ODE4Nzg1MzQsImV4cCI6MTY4MzY3ODUzNCwiZmlyc3ROYW1lIjoiTmd1eeG7hW4gbWluaCIsImxhc3ROYW1lIjoiVGnhur9uIiwiZW5hYmxlZCI6dHJ1ZSwicHJpdmFjeVBvbGljeUFjY2VwdGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiYWVkNDMyNDAtYzk0Mi0xMWVkLWI2MmMtN2Q4MDUyYWQzOWNmIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.J8WwrqaeGVQNwE7_I8X4c87z2PQRFPh4iofczRsUN6i9t8s4FwG9qifaZ2hxLmwEBUn305Cy3bil4SDFdxbU-w",
              "Content-Type": "application/json",
            },
          }
        );
        const deviceData = await deviceResponse.json();

        // Lấy giá trị temperature, humidity, light, soilmoisture từ dữ liệu nhận về
        const temperatureData =
          deviceData.temperature && deviceData.temperature[0]?.value;
        const humidityData =
          deviceData.humidity && deviceData.humidity[0]?.value;
        const lightData = deviceData.light && deviceData.light[0]?.value;
        const soilMoistureData =
          deviceData.soilmoisture && deviceData.soilmoisture[0]?.value;

        // Cập nhật state với dữ liệu lấy về từ thiết bị
        setTemperature(temperatureData);
        setHumidity(humidityData);
        setLight(lightData);
        setSoilMoisture(soilMoistureData);

        // Lấy giá trị email từ AsyncStorage
        const email = await AsyncStorage.getItem("email");
        const tree = await AsyncStorage.getItem("tree");
        setTree(tree);
        const date = await AsyncStorage.getItem("date");
        setDate(date);
        // Gọi API với email lấy được từ AsyncStorage
        const response = await client.get(`/get-value-manual/${email}`);
        // Lấy dữ liệu trả về từ API và cập nhật vào state tasks
        setTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const intervalId = setInterval(fetchData, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (!weatherData) {
    return <Text>Loading...</Text>;
  }

  if (
    temperature === null ||
    humidity === null ||
    light === null ||
    soilmoisture === null
  ) {
    return <Text>Loading...</Text>;
  }

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

  // Sắp xếp danh sách công việc theo thời gian gần nhất đến xa nhất
  const sortedTasks = [...tasks].sort(compareTasksByTime);
  const taskPost = sortedTasks.map((task) => {
    return {
      amountOfWater: task.waterAmount,
      date: formatSelectedDate(task.selectedDate),
      hour: formatSelectedHour(task.selectedHour),
    };
  });
  const extractedData =
    weatherData &&
    weatherData.list &&
    weatherData.list.map((item) => ({
      temp: item.main.temp,
      dt_txt: item.dt_txt,
      weather: item.weather[0].main,
    }));
  const now = new Date();
  const currentDateTime = now.getTime();
  const last24HoursDateTime = currentDateTime - 24 * 60 * 60 * 1000;
  const last24HoursItems =
    extractedData &&
    extractedData
      .filter((item) => new Date(item.dt_txt).getTime() >= last24HoursDateTime)
      .slice(0, 24);

  const data =
    last24HoursItems &&
    last24HoursItems.map((item) => {
      const date = item.dt_txt.slice(8, 10);
      const month = item.dt_txt.slice(5, 7);
      const time = item.dt_txt.slice(11, 16);
      const formattedDate = `${date}-${month}`;
      return {
        temperature: item.temp,
        dateTime: `${formattedDate} ${time}`,
        weather: item.weather,
      };
    });

  const navigation = useNavigation();
  const handleNotify = () => {
    navigation.navigate("Notify");
  };

  const handleAutomatic = () => {
    navigation.navigate("AutomaticView1");
  };
  const handleManual = () => {
    navigation.navigate("ManualList1");
  };

  const updateSetPump = async (value) => {
    const url =
      "https://demo.thingsboard.io/api/plugins/rpc/oneway/1e296570-c966-11ed-b62c-7d8052ad39cf";
    const headers = {
      "X-Authorization":
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aWVuLm5ndXllbm1pbmh0aWVuMjYwOTAyQGdtYWlsLmNvbSIsInVzZXJJZCI6ImIwYzRiN2EwLWM5NDItMTFlZC1iNjJjLTdkODA1MmFkMzljZiIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwic2Vzc2lvbklkIjoiYzgxNWRmOTgtMWQxYS00MDBmLTlhNDAtODM1MDhjZWViYTNmIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2ODE4Nzg1MzQsImV4cCI6MTY4MzY3ODUzNCwiZmlyc3ROYW1lIjoiTmd1eeG7hW4gbWluaCIsImxhc3ROYW1lIjoiVGnhur9uIiwiZW5hYmxlZCI6dHJ1ZSwicHJpdmFjeVBvbGljeUFjY2VwdGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiYWVkNDMyNDAtYzk0Mi0xMWVkLWI2MmMtN2Q4MDUyYWQzOWNmIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.J8WwrqaeGVQNwE7_I8X4c87z2PQRFPh4iofczRsUN6i9t8s4FwG9qifaZ2hxLmwEBUn305Cy3bil4SDFdxbU-w",
      "Content-Type": "application/json",
    };
    const data1 = {
      method: "Mode",
      params: "1",
      timeout: 500,
    };
    const data2 = {
      method: "setPump",
      params: value,
      timeout: 500,
    };
    try {
      const response1 = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data1),
      });
      if (response1.ok) {
        console.log("Mode updated to 1");
      } else {
        console.error("Failed to update Mode = 1");
      }

      // Đợi 1 giây trước khi gửi dữ liệu tiếp theo
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response2 = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data2),
      });
      if (response2.ok) {
        console.log(`SetPump updated to ${value}`);
      } else {
        console.error("Failed to update SetPump");
      }
    } catch (error) {
      console.error(`Failed to update SetPump: ${error}`);
    }
  };

  const handleTogglePump = () => {
    const newPumpValue = setPump === 0 ? 1 : 0;
    updateSetPump(newPumpValue);

    setSetPump(newPumpValue);
    setButtonPump(newPumpValue === 1 ? "Tắt máy bơm" : "Bật máy bơm");
  };

  const updateSetPump1 = async (value) => {
    const url =
      "https://demo.thingsboard.io/api/plugins/rpc/oneway/1e296570-c966-11ed-b62c-7d8052ad39cf";
    const headers = {
      "X-Authorization":
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aWVuLm5ndXllbm1pbmh0aWVuMjYwOTAyQGdtYWlsLmNvbSIsInVzZXJJZCI6ImIwYzRiN2EwLWM5NDItMTFlZC1iNjJjLTdkODA1MmFkMzljZiIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwic2Vzc2lvbklkIjoiYzgxNWRmOTgtMWQxYS00MDBmLTlhNDAtODM1MDhjZWViYTNmIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2ODE4Nzg1MzQsImV4cCI6MTY4MzY3ODUzNCwiZmlyc3ROYW1lIjoiTmd1eeG7hW4gbWluaCIsImxhc3ROYW1lIjoiVGnhur9uIiwiZW5hYmxlZCI6dHJ1ZSwicHJpdmFjeVBvbGljeUFjY2VwdGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiYWVkNDMyNDAtYzk0Mi0xMWVkLWI2MmMtN2Q4MDUyYWQzOWNmIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.J8WwrqaeGVQNwE7_I8X4c87z2PQRFPh4iofczRsUN6i9t8s4FwG9qifaZ2hxLmwEBUn305Cy3bil4SDFdxbU-w",
      "Content-Type": "application/json",
    };
    const data = { ...value };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(`Success: ${value}`);
      } else {
        console.error("Failed ");
      }
    } catch (error) {
      console.error(`Failed: ${error}`);
    }
  };

  const handleTogglePump1 = () => {
    const newPumpValue = setPump1 === 0 ? 1 : 0;
    const newButtonText = newPumpValue === 1 ? "Dừng" : "Tưới 1";

    if (newButtonText === "Dừng") {
      // Gửi dữ liệu Mode:3
      updateSetPump1({ method: "Mode", params: "3", timeout: 500 });

      // Chờ 1 giây, sau đó gửi dữ liệu selectedPlant
      setTimeout(() => {
        updateSetPump1({ method: "selectedPlant", params: tree, timeout: 500 });

        // Chờ 1 giây, sau đó gửi dữ liệu selectedDate
        setTimeout(() => {
          updateSetPump1({
            method: "selectedDate",
            params: date,
            timeout: 500,
          });
        }, 1000);
      }, 1000);
    } else {
      // Gửi dữ liệu Mode:0
      updateSetPump1({ method: "Mode", params: "1", timeout: 500 });
    }

    setSetPump1(newPumpValue);
    setButtonText(newButtonText);
  };

  const updateSetPump2 = async (value) => {
    const url =
      "https://demo.thingsboard.io/api/plugins/rpc/oneway/1e296570-c966-11ed-b62c-7d8052ad39cf";
    const headers = {
      "X-Authorization":
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aWVuLm5ndXllbm1pbmh0aWVuMjYwOTAyQGdtYWlsLmNvbSIsInVzZXJJZCI6ImIwYzRiN2EwLWM5NDItMTFlZC1iNjJjLTdkODA1MmFkMzljZiIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwic2Vzc2lvbklkIjoiYzgxNWRmOTgtMWQxYS00MDBmLTlhNDAtODM1MDhjZWViYTNmIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2ODE4Nzg1MzQsImV4cCI6MTY4MzY3ODUzNCwiZmlyc3ROYW1lIjoiTmd1eeG7hW4gbWluaCIsImxhc3ROYW1lIjoiVGnhur9uIiwiZW5hYmxlZCI6dHJ1ZSwicHJpdmFjeVBvbGljeUFjY2VwdGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiYWVkNDMyNDAtYzk0Mi0xMWVkLWI2MmMtN2Q4MDUyYWQzOWNmIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.J8WwrqaeGVQNwE7_I8X4c87z2PQRFPh4iofczRsUN6i9t8s4FwG9qifaZ2hxLmwEBUn305Cy3bil4SDFdxbU-w",
      "Content-Type": "application/json",
    };
    const data = { ...value };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(`Success: ${value}`);
      } else {
        console.error("Failed");
      }
    } catch (error) {
      console.error(`Failed: ${error}`);
    }
  };

  const handleTogglePump2 = () => {
    const newPumpValue = setPump2 === 0 ? 1 : 0;
    if (newPumpValue === 1) {
      updateSetPump2({ method: "Mode", params: "2", timeout: 500 }); // Gửi dữ liệu {method: "Mode", params: 2}
      setTimeout(() => {
        updateSetPump2({ method: "task", params: taskPost, timeout: 500 }); // Gửi dữ liệu {method: "task", params: taskPost}
      }, 1000); // Đợi 1 giây trước khi gửi dữ liệu thứ 2
      setButtonText2("Dừng");
    } else {
      updateSetPump2({ method: "Mode", params: "1", timeout: 500 }); // Gửi dữ liệu {method: "Mode", params: 0}
      setButtonText2("Tưới 2");
    }
    setSetPump2(newPumpValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trang chủ</Text>
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>
            Chúc một ngày mới tốt lành, IceTea
          </Text>
          <TouchableOpacity onPress={handleNotify}>
            <Ionicons
              name="notifications-circle-outline"
              size={40}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.weather}>
        <View style={styles.rectangle1}>
          <View style={styles.flexRow}>
            <View style={styles.left}>
              <View style={styles.location}>
                <AntDesign name="enviroment" size={30} color="black" />
                <Text style={styles.locationText}>Ho Chi Minh City</Text>
              </View>
              <Text style={styles.temp}>{temperature}°C</Text>
              <Text style={styles.label}>Humidity: {humidity}</Text>
            </View>

            <Image
              style={styles.image1}
              source={
                temperature > 33
                  ? sun
                  : temperature > 28
                  ? sunrain
                  : temperature > 25
                  ? cloud
                  : rain
              }
            />
          </View>
          <View style={styles.flexRow}>
            <View style={styles.flexRow1}>
              <MaterialCommunityIcons
                name="air-humidifier"
                size={24}
                color="black"
              />
              <Text style={styles.label}>{soilmoisture}</Text>
            </View>
            <View style={styles.flexRow1}>
              <Entypo name="light-up" size={24} color="black" />
              <Text style={styles.label}>{light}</Text>
            </View>
          </View>
        </View>
        <ScrollView horizontal={true} style={styles.scrollView}>
          {data.map((item, index) => (
            <View key={index} style={styles.rectangle}>
              <Text style={styles.hour}>{item.dateTime}</Text>
              <Image
                style={styles.image}
                source={
                  item.temperature > 33
                    ? sun
                    : item.temperature > 28
                    ? sunrain
                    : item.temperature > 25
                    ? cloud
                    : rain
                }
              />
              <Text style={styles.temperature}>{item.temperature}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View>
        <TouchableOpacity
          style={[
            styles.autoButton,
            {
              backgroundColor: buttonPump === "Bật máy bơm" ? "grey" : "red",
            },
          ]}
          onPress={handleTogglePump}
        >
          <Text style={styles.autoWateringButtonText}>{buttonPump}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.autoWateringContainer}>
        <View style={[styles.autoWatering, styles.autoWatering1]}>
          <Text style={styles.textWatering}>
            <Text style={styles.autoWateringTitle}>Tưới tự động</Text>
          </Text>
          <View style={styles.wateringSetting}>
            <TouchableOpacity
              style={styles.autoWateringButton}
              onPress={handleTogglePump1}
            >
              <Text style={styles.autoWateringButtonText}>{buttonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAutomatic}>
              <Image
                source={{
                  uri: "https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png",
                }}
                style={styles.autoWateringIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.autoWatering, styles.autoWatering2]}>
          <Text style={styles.textWatering}>
            <Text style={styles.autoWateringTitle}>Tưới thủ công</Text>
          </Text>
          <View style={styles.wateringSetting}>
            <TouchableOpacity
              style={styles.autoWateringButton}
              onPress={handleTogglePump2}
            >
              <Text style={styles.autoWateringButtonText}>{buttonText2}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleManual}>
              <Image
                source={{
                  uri: "https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png",
                }}
                style={styles.autoWateringIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D47",
  },
  header: {
    flexDirection: "column",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    flex: 1,
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfoText: {
    fontSize: 16,
    color: "#fff",
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  weather: {
    alignItems: "center",
    justifyContent: "center",
    flex: 4,
  },
  flexRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  flexRow1: {
    flexDirection: "row",
  },
  rectangle1: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 20,
  },
  left: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  footerWeather: {
    flexDirection: "row",
  },
  temp: {
    fontSize: 45,
    fontWeight: "bold",
    marginLeft: 10,
  },
  temperature1: {
    fontSize: 30,
    fontWeight: "bold",
  },
  label: {
    fontSize: 20,
  },
  image1: {
    width: 100,
    height: 100,
  },

  rectangle: {
    width: 100,
    height: 150,
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  hour: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 18,
  },
  autoWateringContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    flex: 2,
  },
  autoWatering: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    flex: 1,
  },
  autoWatering1: { backgroundColor: "#4D6A97" },
  autoWatering2: { backgroundColor: "#78267D" },
  textWatering: {
    flex: 1,
    marginTop: 10,
    flexDirection: "column",
  },
  autoWateringTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  wateringSetting: {
    flexDirection: "row",
    alignItems: "center",
    flex: 3,
  },
  autoWateringButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#48319D",
    opacity: 0.8,
    borderRadius: 10,
  },
  autoButton: {
    marginTop: 10,
    marginLeft: 10,
    padding: 10,
    backgroundColor: "grey",
    opacity: 0.8,
    borderRadius: 10,
    alignItems: "center",
    width: "50%",
  },
  autoWateringButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  autoWateringIcon: {
    marginTop: 10,
    marginLeft: 30,
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    padding: 10,
    flex: 1,
  },
  bottomItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF",
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  bottomItemText: {
    fontWeight: "bold",
  },
});

export default HomeScreen;

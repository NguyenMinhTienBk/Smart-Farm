import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const ChartScreen1 = () => {
  const [currentValue, setCurrentValue] = useState("Temperature");
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [soilmoisture, setSoilmoisture] = useState([]);
  const [light, setLight] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dữ liệu thiết bị
        const deviceResponse = await fetch(
          "https://demo.thingsboard.io/api/plugins/telemetry/DEVICE/1e296570-c966-11ed-b62c-7d8052ad39cf/values/timeseries?keys=temperature%2Chumidity%2Clight%2Csoilmoisture",
          {
            headers: {
              "X-Authorization":
                "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aWVuLm5ndXllbm1pbmh0aWVuMjYwOTAyQGdtYWlsLmNvbSIsInVzZXJJZCI6ImIwYzRiN2EwLWM5NDItMTFlZC1iNjJjLTdkODA1MmFkMzljZiIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwic2Vzc2lvbklkIjoiMjlmOGU5MjktYzJhZC00Y2IwLTlhMzktMGZjMjBlMTQxZWFkIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2ODM3NzY2NjAsImV4cCI6MTY4NTU3NjY2MCwiZmlyc3ROYW1lIjoiTmd1eeG7hW4gbWluaCIsImxhc3ROYW1lIjoiVGnhur9uIiwiZW5hYmxlZCI6dHJ1ZSwicHJpdmFjeVBvbGljeUFjY2VwdGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiYWVkNDMyNDAtYzk0Mi0xMWVkLWI2MmMtN2Q4MDUyYWQzOWNmIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.HI0ll0rHqWXH8VPpfElM2fu6VTYznpE0fZqfWtW2XTISB6JLySzOliBXlqFbx7DhKL0nYjx45NLXd-ktYbmqhw",
              "Content-Type": "application/json",
            },
          }
        );
        const deviceData = await deviceResponse.json();
        const temperatureData =
          deviceData.temperature && deviceData.temperature[0]?.value;

        setTemperature((prevTemperature) => {
          if (prevTemperature.length >= 10) {
            return [temperatureData];
          } else {
            // Thêm giá trị mới nhất vào cuối mảng
            return [...prevTemperature, temperatureData];
          }
        });
        const humidityData =
          deviceData.humidity && deviceData.humidity[0]?.value;
        setHumidity((prevhumidity) => {
          if (prevhumidity.length >= 10) {
            return [humidityData];
          } else {
            // Thêm giá trị mới nhất vào cuối mảng
            return [...prevhumidity, humidityData];
          }
        });

        const lightData = deviceData.light && deviceData.light[0]?.value;
        setLight((prevlight) => {
          if (prevlight.length >= 10) {
            return [lightData];
          } else {
            // Thêm giá trị mới nhất vào cuối mảng
            return [...prevlight, lightData];
          }
        });
        const soilMoistureData =
          deviceData.soilmoisture && deviceData.soilmoisture[0]?.value;
        setSoilmoisture((prevsoilmoisture) => {
          if (prevsoilmoisture.length >= 19) {
            return [soilMoistureData];
          } else {
            // Thêm giá trị mới nhất vào cuối mảng
            return [...prevsoilmoisture, soilMoistureData];
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setTimeout(fetchData, 5000);
    };
    fetchData();
  }, []);
  const initialTemData = [20];
  const initialHudData = [20];
  const initialLightData = [20];
  const initialSoiData = [20];

  const data = {
    Temperature: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          data: initialTemData.concat(temperature),
        },
      ],
    },

    Humidity: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          data: initialSoiData.concat(humidity),
        },
      ],
    },
    Soilmoisture: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          data: initialHudData.concat(soilmoisture),
        },
      ],
    },
    Light: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          data: initialLightData.concat(light),
        },
      ],
    },
  };

  const handleToggle = (value) => {
    setCurrentValue(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Biểu Đồ{" "}
        {currentValue === "Temperature"
          ? "Nhiệt Độ"
          : currentValue === "Humidity"
          ? "Độ Ẩm Không Khí"
          : currentValue == "Soilmoisture"
          ? "Độ Ẩm đất"
          : "Ánh Sáng"}
      </Text>

      <LineChart
        bezier
        data={data[currentValue]}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: "#59ba8d",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          decimalPlaces: 0,
          color: (opacity = 1) =>
            currentValue === "Humidity"
              ? `rgba(150, 0, 100, ${opacity})`
              : currentValue === "Light"
              ? `rgba(100, 127, 0, ${opacity})`
              : `rgba(0, 110, 199, ${opacity})`,
          // labelColor: (opacity = 1) => rgba(255, 255, 255, ${opacity}),
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: "white",
          },
          style: {
            borderRadius: 16,
          },
          yAxis: {
            min: 25,
            max: 35, // Thay đổi giá trị max tại đây
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          },
        }}
        // bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View style={styles.buttonContainer}>
        <Button title="Nhiệt độ" onPress={() => handleToggle("Temperature")} />
        <Button
          title="Độ Ẩm không khí"
          onPress={() => handleToggle("Humidity")}
        />
        <Button title="Ánh Sáng" onPress={() => handleToggle("Light")} />
        <Button
          title="Độ ẩm đất"
          onPress={() => handleToggle("Soilmoisture")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginLeft: 20,
  },
});

export default ChartScreen1;

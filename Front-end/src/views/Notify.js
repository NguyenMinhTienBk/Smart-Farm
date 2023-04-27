import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { DateTime } from "luxon"; // Import thư viện Luxon

const Notify = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [light, setLight] = useState(null);
  const [soilmoisture, setSoilMoisture] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://demo.thingsboard.io/api/plugins/telemetry/DEVICE/1e296570-c966-11ed-b62c-7d8052ad39cf/values/timeseries?keys=temperature%2Chumidity%2Clight%2Csoilmoisture",
          {
            headers: {
              "X-Authorization":
                "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aWVuLm5ndXllbm1pbmh0aWVuMjYwOTAyQGdtYWlsLmNvbSIsInVzZXJJZCI6ImIwYzRiN2EwLWM5NDItMTFlZC1iNjJjLTdkODA1MmFkMzljZiIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwic2Vzc2lvbklkIjoiYzgxNWRmOTgtMWQxYS00MDBmLTlhNDAtODM1MDhjZWViYTNmIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2ODE4Nzg1MzQsImV4cCI6MTY4MzY3ODUzNCwiZmlyc3ROYW1lIjoiTmd1eeG7hW4gbWluaCIsImxhc3ROYW1lIjoiVGnhur9uIiwiZW5hYmxlZCI6dHJ1ZSwicHJpdmFjeVBvbGljeUFjY2VwdGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiYWVkNDMyNDAtYzk0Mi0xMWVkLWI2MmMtN2Q4MDUyYWQzOWNmIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.J8WwrqaeGVQNwE7_I8X4c87z2PQRFPh4iofczRsUN6i9t8s4FwG9qifaZ2hxLmwEBUn305Cy3bil4SDFdxbU-w",
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        // Lấy giá trị temperature, humidity, light, soilmoisture từ dữ liệu nhận về
        const temperatureData = data.temperature && data.temperature[0]?.value;
        const humidityData = data.humidity && data.humidity[0]?.value;
        const lightData = data.light && data.light[0]?.value;
        const soilmoistureData =
          data.soilmoisture && data.soilmoisture[0]?.value;
        setTemperature(temperatureData);
        setHumidity(humidityData);
        setLight(lightData);
        setSoilMoisture(soilmoistureData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      {/* Kiểm tra cả 2 điều kiện */}
      {temperature && humidity && (
        <View style={styles.container}>
          {(temperature < 20 || temperature > 50) && (
            <View style={styles.item}>
              <Text style={styles.timeText}>
                {DateTime.now().toFormat("dd/MM/yyyy, HH:mm:ss")}
              </Text>
              <Text style={styles.contentText}>Nhiệt độ vượt ngưỡng. </Text>
            </View>
          )}
          {(light < 1 || light > 50) && (
            <View style={styles.item}>
              <Text style={styles.timeText}>
                {DateTime.now().toFormat("dd/MM/yyyy, HH:mm:ss")}
              </Text>
              <Text style={styles.contentText}>Ánh sáng vượt ngưỡng. </Text>
            </View>
          )}
          {(soilmoisture < 50 || soilmoisture > 85) && (
            <View style={styles.item}>
              <Text style={styles.timeText}>
                {DateTime.now().toFormat("dd/MM/yyyy, HH:mm:ss")}
              </Text>
              <Text style={styles.contentText}>Độ ẩm đất vượt ngưỡng. </Text>
            </View>
          )}
          {humidity < 50 && (
            <View style={styles.item}>
              <Text style={styles.timeText}>
                {DateTime.now().toFormat("dd/MM/yyyy, HH:mm:ss")}
              </Text>
              <Text style={styles.contentText}>
                Độ ẩm không khí hiện tại thấp hơn 50%{" "}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#DEDCDE",
    marginVertical: 5,
  },
  timeText: {
    fontSize: 14,
    color: "#666",
  },
  contentText: {
    fontSize: 16,
    color: "red",
    marginTop: 8,
  },
});

export default Notify;

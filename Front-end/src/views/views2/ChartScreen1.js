import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const ChartScreen1 = () => {
  const [currentValue, setCurrentValue] = useState("Temperature");
  const data = {
    Temperature: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          data: [25, 20, 26, 26, 35, 30],
        },
      ],
    },
    Humidity: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          data: [30, 45, 40, 55, 60, 65],
        },
      ],
    },
    Light: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          data: [100, 200, 100, 158, 300, 350],
        },
      ],
    },
  };

  const handleToggle = (value) => {
    setCurrentValue(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentValue} Chart</Text>
      <LineChart
        data={data[currentValue]}
        width={320}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View style={styles.buttonContainer}>
        <Button title="Nhiệt độ" onPress={() => handleToggle("Temperature")} />
        <Button title="Độ Ẩm" onPress={() => handleToggle("Humidity")} />
        <Button title="Ánh Sáng" onPress={() => handleToggle("Light")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginLeft: 20,
  },
});

export default ChartScreen1;

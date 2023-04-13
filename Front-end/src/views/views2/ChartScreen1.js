import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const ChartScreen1 = () => {
  const [currentValue, setCurrentValue] = useState("Temperature");
  const data = {
    Temperature: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jun','Jun','Jun','Jun','Jun','Jun','Jun','Jun'],
      datasets: [
        {
          data: [25, 20, 26, 26, 35, 30,29,27,24,21,29,15,27,36],
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
      <Text style={styles.title}>
        Biểu Đồ {currentValue === 'Temperature' ? 'Nhiệt Độ' : currentValue === 'Humidity' ? 'Độ Ẩm' : 'Ánh Sáng'}
      </Text>

      <LineChart
        bezier
        data={data[currentValue]}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#59ba8d',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 0,
          color: (opacity = 1) =>
          currentValue === 'Humidity'
            ? `rgba(150, 0, 100, ${opacity})`
            : currentValue === 'Light' ? `rgba(100, 127, 0, ${opacity})`
            : `rgba(0, 110, 199, ${opacity})`,
          // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: "white"
          },
          style: {
            borderRadius: 16,
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
        <Button title="Độ Ẩm" onPress={() => handleToggle("Humidity")} />
        <Button title="Ánh Sáng" onPress={() => handleToggle("Light")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
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

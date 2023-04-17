import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Task(props) {
  return (
    <View style={styles.aitem}>
      <View style={styles.square}>
        <Text style={styles.number}>{props.count}</Text>
      </View>

      <View style={styles.middleContent}>
        <Text style={styles.middleContent__text2}>{props.selectedHour}</Text>
        <Text style={styles.middleContent__text2}>{props.selectedDate}</Text>
      </View>
      <View style={styles.contain}>
        <Text style={styles.LastNumberText}>{props.waterAmount}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  aitem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  square: {
    width: 48,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#53d6f2",
    alignItems: "center",
    justifyContent: "center",
  },
  middleContent: {},
  middleContent__text2: {
    fontSize: 13,
  },
  contain: { justifyContent: "flex-start", width: "20%" },
  LastNumberText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});

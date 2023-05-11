import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Task(props) {
  return (
    <View style={styles.aitem}>
      <View style={styles.square}>
        <Text style={styles.number}>{props.count}</Text>
      </View>

      <View style={styles.middleContent}>
        <Text style={styles.middleContent__text2}>{props.selectedHour}</Text>
        <Text style={styles.middleContent__text2}>{props.selectedDate}</Text>
        {props.waterAmount ? (
          <Text style={styles.middleContent__text2}>
            Lượng nước tưới: {props.waterAmount} lít
          </Text>
        ) : (
          <Text style={styles.middleContent__text2}>
            Thời gian tưới: {props.time} phút{" "}
          </Text>
        )}
      </View>

      <View style={styles.botttom}>
        <TouchableOpacity onPress={() => props.handleDeleteTask(props.taskId)}>
          <Icon name="trash" size={30} color="red" />
        </TouchableOpacity>
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
  },
  square: {
    width: 48,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#53d6f2",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  middleContent: { flex: 5, marginLeft: 25 },
  middleContent__text2: {
    fontSize: 13,
  },
  botttom: {
    flex: 1,
  },
  contain: { justifyContent: "flex-start", width: "20%" },
  LastNumberText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});

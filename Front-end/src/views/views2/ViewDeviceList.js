import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const ViewDeviceList = () => {
  const navigation = useNavigation();
  const handleViewDHT20 = () => {
    navigation.navigate("DHT20");
  };
  const handleViewYoloBit = () => {
    navigation.navigate("YoloBit");
  };
  const handleViewExtendYoloBit = () => {
    navigation.navigate("EYoloBit");
  };
  const handleViewHumidity = () => {
    navigation.navigate("Humidity");
  };
  const handleViewLight = () => {
    navigation.navigate("Light");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/301632140_1448536232323376_1500603615049683013_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=YEQXkLuAfogAX8O5ilP&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAWqSMXEFhp9JCszBcRnx3MES0NQDbNMM6OXJbZNTx_8w&oe=641F3B25",
            }}
            style={styles.userAvatar}
          />
          <Text style={styles.userInfoText}>IceTea</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.redText}>Device</Text>
        <TouchableOpacity style={styles.rowContainer} onPress={handleViewDHT20}>
          <Text style={styles.text}>Cảm biến nhiệt độ độ ẩm DHT20</Text>
          <Icon name="keyboard-arrow-right" size={20} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rowContainer}
          onPress={handleViewHumidity}
        >
          <Text style={styles.text}>Cảm biến độ ẩm đất</Text>
          <Icon name="keyboard-arrow-right" size={20} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowContainer} onPress={handleViewLight}>
          <Text style={styles.text}>Cảm biến ánh sáng</Text>
          <Icon name="keyboard-arrow-right" size={20} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rowContainer}
          onPress={handleViewYoloBit}
        >
          <Text style={styles.text}>Yolo-Bit</Text>
          <Icon name="keyboard-arrow-right" size={20} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rowContainer}
          onPress={handleViewExtendYoloBit}
        >
          <Text style={styles.text}>Mạch mở rộng cho Yolo-Bit</Text>
          <Icon name="keyboard-arrow-right" size={20} style={styles.icon} />
        </TouchableOpacity>
      </View>
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
    flex: 2,
    marginTop: 50,
  },

  userInfo: {
    marginTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#202020",
  },
  userInfoText: {
    fontSize: 20,
    color: "#fff",
  },
  userAvatar: {
    width: 55,
    height: 55,
    borderRadius: 40,
    marginRight: 15,
  },
  content: {
    flex: 6,
    marginHorizontal: 20,
  },
  redText: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  text: {
    fontSize: 16,
    marginRight: 10,
    color: "#fff",
  },
  icon: {
    color: "#ccc",
  },
});

export default ViewDeviceList;

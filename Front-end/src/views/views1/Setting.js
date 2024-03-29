import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import TabBar from "../../components/TabBar";

const Setting = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    navigation.navigate("Login");
  };
  const handleEditUser = () => {
    navigation.navigate("EditUser");
  };
  const handleCheckVermin = () => {
    navigation.navigate("CheckVermin");
  };
  const handleTree = () => {
    navigation.navigate("TreeList");
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
        <Text style={styles.redText}>Cài đặt</Text>
        <TouchableOpacity style={styles.rowContainer} onPress={handleEditUser}>
          <Text style={styles.text}>Xem thông tin cá nhân</Text>
          <Icon name="keyboard-arrow-right" size={20} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rowContainer}
          onPress={handleCheckVermin}
        >
          <Text style={styles.text}>Kiểm tra sâu bọ</Text>
          <Icon name="keyboard-arrow-right" size={20} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowContainer} onPress={handleTree}>
          <Text style={styles.text}>Danh sách cây trồng</Text>
          <Icon name="keyboard-arrow-right" size={20} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.rowContainer} onPress={handleLogout}>
          <Text style={styles.text}>Đăng xuất</Text>
          <Icon name="keyboard-arrow-right" size={20} style={styles.icon} />
        </TouchableOpacity>
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
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    justifyContent: "space-between",
  },
});

export default Setting;

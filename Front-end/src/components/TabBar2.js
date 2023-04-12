import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TabBar = () => {
  const navigation = useNavigation();
  const handleTabClick = (tabName) => {
    // do other things based on the tab name
    navigation.navigate(tabName);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundColor: "green",
        paddingBottom: 10,
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          paddingVertical: 10,
        }}
        onPress={() => handleTabClick("Price")}
      >
        <MaterialCommunityIcons name="purse" size={26} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          paddingVertical: 10,
        }}
        onPress={() => handleTabClick("News")}
      >
        <Entypo name="news" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: 50,
          width: 60,
          height: 60,
          marginBottom: 10,
          marginTop: -20,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 2,
          borderColor: "#000",
          borderWidth: 1,
          backgroundColor: "green",
        }}
        onPress={() => handleTabClick("HomeView2")}
      >
        <FontAwesome5 name="home" size={36} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          paddingVertical: 10,
        }}
        onPress={() => handleTabClick("Chart")}
      >
        <MaterialCommunityIcons name="google-analytics" size={26} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          paddingVertical: 10,
        }}
        onPress={() => handleTabClick("SettingView2")}
      >
        <FontAwesome name="gear" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import cachua from "../../../assets/fruit/cachua.png";
import duahau from "../../../assets/fruit/duahau.png";
import bapcai from "../../../assets/fruit/bapcai.jpg";
import carot from "../../../assets/fruit/carot.jpg";
import xoai from "../../../assets/fruit/xoai.jpg";
import cam from "../../../assets/fruit/cam.jpg";
import thanhlong from "../../../assets/fruit/thanhlong.png";
import TabBar from "../../components/TabBar";

import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

const DATA = [
  {
    id: "1",
    name: "Cà chua",
    image: cachua,
    price: "20.000đ/kg",
  },
  {
    id: "2",
    name: "Dưa hấu",
    image: duahau,
    price: "50.000đ/kg",
  },
  {
    id: "3",
    name: "Bắp cải",
    image: bapcai,
    price: "15.000đ/kg",
  },
  {
    id: "4",
    name: "Cà rốt",
    image: carot,
    price: "10.000đ/kg",
  },
  {
    id: "5",
    name: "Xoài",
    image: xoai,
    price: "24.000đ/kg",
  },
  {
    id: "6",
    name: "Thanh long",
    image: thanhlong,
    price: "17.000đ/kg",
  },
  {
    id: "7",
    name: "Cam",
    image: cam,
    price: "20.000đ/kg",
  },
];

const Prices = () => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(DATA);

  const handleSearch = (text) => {
    const newData = DATA.filter((item) => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setSearch(text);
    setFilteredData(newData);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm nông sản"
          onChangeText={handleSearch}
          value={search}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <FlatList
        style={styles.items}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.tabbar}>
        <TabBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "space-between",
  },
  items: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  tabbar: {},
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceContainer: {
    backgroundColor: "#eee",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: "auto",
  },
  price: {
    fontSize: 16,
  },
});

export default Prices;

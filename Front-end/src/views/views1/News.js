import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import NewsItem from "../../components/NewsItem";
import TabBar from "../../components/TabBar";

const newsData = [
  {
    id: "1",
    imageUri: "https://picsum.photos/seed/picsum/80/80",
    title: "Nông sản giá rẻ mùa dịch",
    content: "Giá nông sản trong nước đang rớt giá do dịch bệnh",
    date: "22/03/2023",
  },
  {
    id: "2",
    imageUri: "https://picsum.photos/seed/picsum/80/80",
    title: "Nông sản Việt Nam xuất khẩu tăng trưởng",
    content:
      "Trong tháng 3/2023, xuất khẩu nông sản của Việt Nam tăng trưởng mạnh mẽ, đặc biệt là các sản phẩm như cà phê, cao su và gạo.",
    date: "21/03/2023",
  },
  {
    id: "3",
    imageUri: "https://picsum.photos/seed/picsum/80/80",
    title: "Nông dân gặp khó vì thiếu nước",
    content:
      "Tình trạng hạn hán kéo dài đã ảnh hưởng đến sản lượng và chất lượng nông sản của nhiều hộ nông dân.",
    date: "20/03/2023",
  },
  {
    id: "4",
    imageUri: "https://picsum.photos/seed/picsum/80/80",
    title: "Giá cả nông sản thế giới tăng mạnh",
    content:
      "Giá cả nông sản trên thế giới đang tăng mạnh, đặc biệt là các loại ngũ cốc và đậu tương.",
    date: "19/03/2023",
  },
];

const News = () => {
  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <FlatList
          data={newsData}
          renderItem={({ item }) => (
            <NewsItem
              imageUri={item.imageUri}
              title={item.title}
              content={item.content}
              date={item.date}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View>
        <TabBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  items: {
    padding: 10,
  },
});

export default News;

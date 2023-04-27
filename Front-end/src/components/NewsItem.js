import { StyleSheet, Image, Text, View } from "react-native";

const NewsItem = ({ imageUri, title, content, date }) => {
  const formatSelectedDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
  };
  const currentDate = new Date();
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        <Text style={styles.date}>{formatSelectedDate(currentDate)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
});

export default NewsItem;

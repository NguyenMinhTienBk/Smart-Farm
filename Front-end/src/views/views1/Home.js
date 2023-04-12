import React, { useState, useEffect } from "react";
import rain from "../../../assets/weather/rain.png";
import sun from "../../../assets/weather/sun.png";
import sunrain from "../../../assets/weather/sunrain.png";
import cloud from "../../../assets/weather/cloud.png";
import TabBar from "../../components/TabBar";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherRealTime, setWeatherRealTime] = useState(null);

  // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     const response = await fetch(
  //       "https://api.openweathermap.org/data/2.5/forecast?q=Ho%20Chi%20Minh&units=metric&appid=05e89b040c9ca6ccc33fbdd46c4c3272"
  //     );
  //     const json = await response.json();
  //     setWeatherData(json);
  //   };
  //   fetchWeatherData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const [weatherData, weatherRealTime] = await Promise.all([
        fetch(
          "https://api.openweathermap.org/data/2.5/forecast?q=Ho%20Chi%20Minh&units=metric&appid=05e89b040c9ca6ccc33fbdd46c4c3272"
        ).then((res) => res.json()),
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=Ho%20chi%20minh&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667"
        ).then((res) => res.json()),
      ]);
      setWeatherData(weatherData);
      setWeatherRealTime(weatherRealTime);
    };

    fetchData();
  }, []);

  if (!weatherData) {
    return <Text>Loading...</Text>;
  }

  if (!weatherRealTime) {
    return <Text>Loading...</Text>;
  }

  const extractedData =
    weatherData &&
    weatherData.list &&
    weatherData.list.map((item) => ({
      temp: item.main.temp,
      dt_txt: item.dt_txt,
      weather: item.weather[0].main,
    }));
  const now = new Date();
  const currentDateTime = now.getTime();
  const last24HoursDateTime = currentDateTime - 24 * 60 * 60 * 1000;
  const last24HoursItems =
    extractedData &&
    extractedData
      .filter((item) => new Date(item.dt_txt).getTime() >= last24HoursDateTime)
      .slice(0, 24);

  const data =
    last24HoursItems &&
    last24HoursItems.map((item) => {
      const date = item.dt_txt.slice(8, 10);
      const month = item.dt_txt.slice(5, 7);
      const time = item.dt_txt.slice(11, 16);
      const formattedDate = `${date}-${month}`;
      return {
        temperature: item.temp,
        dateTime: `${formattedDate} ${time}`,
        weather: item.weather,
      };
    });

  const navigation = useNavigation();

  const handleAutomatic = () => {
    navigation.navigate("AutomaticView1");
  };
  const handleManual = () => {
    navigation.navigate("ManualView1");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trang chủ</Text>
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>
            Chúc một ngày mới tốt lành, IceTea
          </Text>
          <Image
            source={{
              uri: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/301632140_1448536232323376_1500603615049683013_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=YEQXkLuAfogAX8O5ilP&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAWqSMXEFhp9JCszBcRnx3MES0NQDbNMM6OXJbZNTx_8w&oe=641F3B25",
            }}
            style={styles.userAvatar}
          />
        </View>
      </View>

      <View style={styles.weather}>
        <View style={styles.rectangle1}>
          <View style={styles.flexRow}>
            <View style={styles.left}>
              <View style={styles.location}>
                <AntDesign name="enviroment" size={30} color="black" />
                <Text style={styles.locationText}>{weatherRealTime.name}</Text>
              </View>
              <Text style={styles.temp}>{weatherRealTime.main.temp}°C</Text>
              <Text style={styles.label}>
                Cảm giác như: {weatherRealTime.main.feels_like}
              </Text>
            </View>

            <Image
              style={styles.image1}
              source={
                weatherRealTime.main.temp > 33
                  ? sun
                  : weatherRealTime.main.temp > 28
                  ? sunrain
                  : weatherRealTime.main.temp > 25
                  ? cloud
                  : rain
              }
            />
          </View>
          <View style={styles.flexRow}>
            <View style={styles.flexRow1}>
              <MaterialCommunityIcons
                name="air-humidifier"
                size={24}
                color="black"
              />
              <Text style={styles.label}>
                {weatherData.list[0].main.humidity}%
              </Text>
            </View>
            <View style={styles.flexRow1}>
              <Entypo name="light-up" size={24} color="black" />
              <Text style={styles.label}>
                {weatherData.list[0].main.humidity}%
              </Text>
            </View>
          </View>
        </View>
        <ScrollView horizontal={true} style={styles.scrollView}>
          {data.map((item, index) => (
            <View key={index} style={styles.rectangle}>
              <Text style={styles.hour}>{item.dateTime}</Text>
              <Image
                style={styles.image}
                source={
                  item.temperature > 33
                    ? sun
                    : item.temperature > 28
                    ? sunrain
                    : item.temperature > 25
                    ? cloud
                    : rain
                }
              />
              <Text style={styles.temperature}>{item.temperature}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.autoWateringContainer}>
        <View style={[styles.autoWatering, styles.autoWatering1]}>
          <Text style={styles.textWatering}>
            <Text style={styles.autoWateringTitle}>Tưới tự động</Text>
          </Text>
          <View style={styles.wateringSetting}>
            <TouchableOpacity style={styles.autoWateringButton}>
              <Text style={styles.autoWateringButtonText}>Tưới</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAutomatic}>
              <Image
                source={{
                  uri: "https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png",
                }}
                style={styles.autoWateringIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.autoWatering, styles.autoWatering2]}>
          <Text style={styles.textWatering}>
            <Text style={styles.autoWateringTitle}>Tưới thủ công</Text>
          </Text>
          <View style={styles.wateringSetting}>
            <TouchableOpacity style={styles.autoWateringButton}>
              <Text style={styles.autoWateringButtonText}>Tưới</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleManual}>
              <Image
                source={{
                  uri: "https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png",
                }}
                style={styles.autoWateringIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    flex: 1,
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfoText: {
    fontSize: 16,
    color: "#fff",
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  weather: {
    alignItems: "center",
    justifyContent: "center",
    flex: 4,
  },
  flexRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  flexRow1: {
    flexDirection: "row",
  },
  rectangle1: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 20,
  },
  left: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  footerWeather: {
    flexDirection: "row",
  },
  temp: {
    fontSize: 45,
    fontWeight: "bold",
    marginLeft: 10,
  },
  temperature1: {
    fontSize: 30,
    fontWeight: "bold",
  },
  label: {
    fontSize: 20,
  },
  image1: {
    width: 100,
    height: 100,
  },

  rectangle: {
    width: 100,
    height: 150,
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  hour: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 18,
  },
  autoWateringContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    flex: 2,
  },
  autoWatering: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    flex: 1,
  },
  autoWatering1: { backgroundColor: "#4D6A97" },
  autoWatering2: { backgroundColor: "#78267D" },
  textWatering: {
    flex: 1,
    marginTop: 10,
    flexDirection: "column",
  },
  autoWateringTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  wateringSetting: {
    flexDirection: "row",
    alignItems: "center",
    flex: 3,
  },
  autoWateringButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#48319D",
    opacity: 0.8,
    borderRadius: 10,
  },
  autoWateringButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  autoWateringIcon: {
    marginTop: 10,
    marginLeft: 30,
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    padding: 10,
    flex: 1,
  },
  bottomItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF",
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  bottomItemText: {
    fontWeight: "bold",
  },
});

export default HomeScreen;

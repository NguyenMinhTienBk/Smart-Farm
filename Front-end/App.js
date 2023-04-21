import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/views/Login";
import Option from "./src/views/Option";
import Register from "./src/views/Register";
import CheckVermin from "./src/views/CheckVermin";
import Notify from "./src/views/Notify";
import Tree from "./src/views/Tree";
import TreeList from "./src/views/TreeList";

import HomeView1 from "./src/views/views1/Home";
import SettingView1 from "./src/views/views1/Setting";
import AutomaticView1 from "./src/views/views1/Automatic";
import ManualView1 from "./src/views/views1/Manual";
import ManualList1 from "./src/views/views1/ManualList";
import Price from "./src/views/views1/Prices";
import News from "./src/views/views1/News";
import Chart from "./src/views/views2/Chart";
import HomeView2 from "./src/views/views2/Home";
import SettingView2 from "./src/views/views2/Setting";
import AutomaticView2 from "./src/views/views2/Automatic";
import ManualView2 from "./src/views/views2/Manual";
import ManualList2 from "./src/views/views2/ManualList";
import ViewDeviceList from "./src/views/views2/ViewDeviceList";
import DHT20 from "./src/views/views2/Device/DHT20";
import YoloBit from "./src/views/views2/Device/YoloBit";
import EYoloBit from "./src/views/views2/Device/EYoloBit";
import Humidity from "./src/views/views2/Device/Humidity";
import Light from "./src/views/views2/Device/Light";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Option"
          component={Option}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeView1"
          component={HomeView1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeView2"
          component={HomeView2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingView1"
          component={SettingView1}
          options={{ title: "Cài đặt" }}
        />
        <Stack.Screen
          name="SettingView2"
          component={SettingView2}
          options={{ title: "Cài đặt" }}
        />

        <Stack.Screen
          name="ViewDeviceList"
          component={ViewDeviceList}
          options={{ title: "Xem danh sách thiết bị" }}
        />

        <Stack.Screen
          name="AutomaticView1"
          component={AutomaticView1}
          options={{ title: "Thiết lập tưới tự động" }}
        />
        <Stack.Screen
          name="ManualView1"
          component={ManualView1}
          options={{ title: "Thiết lập tưới thủ công" }}
        />
        <Stack.Screen
          name="AutomaticView2"
          component={AutomaticView2}
          options={{ title: "Thiết lập task" }}
        />

        <Stack.Screen
          name="ManualView2"
          component={ManualView2}
          options={{ title: "Thiết lập task " }}
        />
        <Stack.Screen
          name="ManualList1"
          component={ManualList1}
          options={{ title: "Danh sách lịch tưới thủ công" }}
        />
        <Stack.Screen
          name="ManualList2"
          component={ManualList2}
          options={{ title: "Danh sách lịch tưới thủ công" }}
        />
        <Stack.Screen
          name="Chart"
          component={Chart}
          options={{ title: "Phân tích dữ liệu" }}
        />
        <Stack.Screen
          name="Price"
          component={Price}
          options={{ title: "Thị trường nông sản" }}
        />
        <Stack.Screen
          name="News"
          component={News}
          options={{ title: "Tin tức nông sản" }}
        />
        <Stack.Screen
          name="CheckVermin"
          component={CheckVermin}
          options={{ title: "Kiểm tra sâu bọ" }}
        />
        <Stack.Screen
          name="DHT20"
          component={DHT20}
          options={{ title: "Cảm biến nhiệt độ độ ẩm DHT20" }}
        />
        <Stack.Screen
          name="YoloBit"
          component={YoloBit}
          options={{ title: "Yolo-Bit" }}
        />
        <Stack.Screen
          name="EYoloBit"
          component={EYoloBit}
          options={{ title: "Mạch mở rộng cho Yolo-Bit" }}
        />
        <Stack.Screen
          name="Humidity"
          component={Humidity}
          options={{ title: "Cảm biến độ ẩm đất" }}
        />
        <Stack.Screen
          name="Light"
          component={Light}
          options={{ title: "Cảm biến ánh sáng" }}
        />
        <Stack.Screen
          name="Notify"
          component={Notify}
          options={{ title: "Thông báo" }}
        />
        <Stack.Screen
          name="Tree"
          component={Tree}
          options={{ title: "Thêm cây trồng" }}
        />
        <Stack.Screen
          name="TreeList"
          component={TreeList}
          options={{ title: "Danh sách cây trồng" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

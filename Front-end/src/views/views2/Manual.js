import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute,useNavigation } from "@react-navigation/native";

export default function WateringForm() {
  
  const navigation = useNavigation();
  const handleManualList = () => {
    navigation.navigate("ManualList");
  };
  const [waterAmount, setWaterAmount] = useState('');
  

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState(new Date());
  const [showTimePicker, setshowTimePicker] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selectedValue, setSelectedValue] = useState('không lặp lại');
  const handleDateSelect = (event, date) => {
    if (date) {
      setSelectedDate(date);
      setShowPicker(Platform.OS === 'ios');
    } else {
      setShowPicker(false);
    }
  };


  // const showTimePicker = () => {
  //   setSelectedHour(new Date());
  // };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setSelectedHour(selectedTime);
      setshowTimePicker(Platform.OS === 'ios')
    } else {
      setshowTimePicker(false);
    }
  };
  const handleIconPress = () => {
    setShowList(!showList);
  };

  const handleListItemPress = (value) => {
    setSelectedValue(value);
    setShowList(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.waterAmount}>
        <Text style={styles.question}>Nhập Lượng nước cần tưới</Text>
        <TextInput
          style={styles.input}
          value={waterAmount}
          onChangeText={text => setWaterAmount(text)}
          keyboardType="numeric"
          placeholder="Nhập lượng nước bạn mong muốn vào đây"
          placeholderTextColor="#999"
          fontSize={17}
        />
      </View>
      <View style={styles.setDateANDsetTime}>
        <Text style={styles.question}>Cài đặt ngày và giờ cho lịch</Text>
        <View style={styles.part}>
          <TextInput
            editable={false}
            style={styles.input}
            placeholder="Select date"
            value={selectedDate.toLocaleDateString('vi-VN')}
          />
          <TouchableOpacity style={[styles.icon, { marginLeft: 12 }]} onPress={() => setShowPicker(true)}>
            <Foundation name="calendar" size={35} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.part}>
          <TextInput
            editable={false}
            style={styles.input}
            value={selectedHour.toLocaleTimeString()}
          />
          <TouchableOpacity style={styles.icon} onPress={() => setshowTimePicker(true)}>
            <Ionicons name="ios-alarm-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateSelect}
          />
        )}
        {Platform.OS === 'android' && showTimePicker && (
          <DateTimePicker
            mode="time"
            value={selectedHour}
            onChange={handleTimeChange}
          />
        )}
      </View>
      <View style={styles.repeatAction}>
        <Text style={styles.question}>Lặp lại</Text>
        <View style={styles.repeatWrapper}>
          <TextInput
            style={styles.input1}
            value={selectedValue}
            editable={false}
          />
          <TouchableOpacity onPress={handleIconPress}>
            <AntDesign style={{ marginLeft: 13 }} name="caretdown" size={24} color="white" />
          </TouchableOpacity>
        </View>

      </View>
      {showList && (
        <View style={styles.list}>
          <TouchableOpacity onPress={() => handleListItemPress('Không lặp lại')}>
            <Text style={styles.listItem}>Không lặp lại</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleListItemPress('Một lần một ngày')}>
            <Text style={styles.listItem}>Một lần một ngày</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleListItemPress('Một lần 1 tuần')}>
            <Text style={styles.listItem}>Một lần 1 tuần</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleListItemPress('Một lần một tháng')}>
            <Text style={styles.listItem}>Một lần một tháng</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleListItemPress('Khác')}>
            <Text style={styles.listItem}>Khác</Text>
          </TouchableOpacity>

        </View>
      )}
      <View style={styles.doneCheckbox}>
        <TouchableOpacity onPress={handleManualList}>
          <MaterialIcons style={styles.checkboxDone} name="done" size={50} color="#427ef5" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1F1D47",
  },
  part: {
    flexDirection: 'row',
  },
  icon: {
    marginTop: 20,
    marginLeft: 10,
  },
  input: {
    width: '90%',
    fontSize: 20,
    color: 'white',
    padding: 5,
    marginBottom: 30,
    borderBottomColor: 'white',
    borderBottomWidth: 2
  },
  input1: {
    width: '90%',
    fontSize: 20,
    color: 'white',
    padding: 5,
    marginBottom: 30,
    border: 'none',
  },
  question: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#00B2FF",
  },
  button: {
    backgroundColor: "#00B2FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  repeatWrapper: {
    flexDirection: "row",
  },
  list: {

    backgroundColor: "#2C2A4C",
    borderRadius: 5,
    position: 'absolute',
    top: 300,
    left: 0,
    right: 0,
    // bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    color: 'white',
    padding: 10,
  },
  doneCheckbox: {
    width: 70,
    height: 70,
    backgroundColor: "#21a3d0",
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',

    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: "#eff7f8"
  },
  checkboxDone: {

    fontSize: 40,
        color: "#FFFFFF",
  },
});

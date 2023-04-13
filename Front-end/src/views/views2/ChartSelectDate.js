import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
const DateScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  const handleDateBackward = () => {
    const newDate = new Date(date.getTime() - 86400000);
    setDate(newDate);
  };

  const handleDateForward = () => {
    const newDate = new Date(date.getTime() + 86400000);
    setDate(newDate);
  };
  return (
    <View style={styles.container}>
      <View style={styles.dateInputContainer}>
        <TouchableOpacity onPress={handleDateBackward}>
          <MaterialIcons name="arrow-left" size={55} color="white" />
        </TouchableOpacity>
        <TextInput
          style={styles.dateInput}
          value={date.toLocaleDateString('vi-VN')}
          editable={false}
        />
        <TouchableOpacity onPress={handleDateForward}>
          <MaterialIcons name="arrow-right" size={55} color="white" />
        </TouchableOpacity>
      </View>

      <Button
        title="Chọn ngày"
        onPress={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    height: 60,
    width: 220,
    fontSize: 23,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: 'rgba(77, 128, 209, 1)',
    color: 'white',
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    // marginRight: 10,
    textAlign: 'center',
  },
});

export default DateScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.dateInput}
        value={date.toDateString()}
        editable={false}
      />
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
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateInput: {
    height: 60,
    width: 200,
    fontSize:23,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: 'rgba(77, 128, 209, 1)',
    color:'white', 
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
  },
});

export default DateScreen;

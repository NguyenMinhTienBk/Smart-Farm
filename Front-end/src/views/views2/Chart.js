import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
import ChartScreen1 from './ChartScreen1';
import DateScreen from './ChartSelectDate'
const Chart = () =>{
  
    return(
        <View style={styles.container}>
          <DateScreen/>
          <ChartScreen1/>

      
    
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(14, 57, 130, 1)',
    },
    
   
  });
  export default Chart;  
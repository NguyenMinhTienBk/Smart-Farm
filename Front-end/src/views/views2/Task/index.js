import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function Task() {
    return (
        <View style={styles.aitem}>
            <View style={styles.square}>
                <Text style={styles.number}>01</Text>
            </View>

            <View style={styles.middleContent}>
                <Text>Hệ thống tưới nhỏ giọt</Text>
                <Text style={styles.middleContent__text2}>16/4/2023, 2:37:11 PM</Text>
            </View>
            <Text style={styles.LastNumberText}>20 Lít</Text>
        </View>
    )
}
const styles = StyleSheet.create({
   
    aitem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    square:{
      width: 48,
      height: 36,
      borderRadius:10,
      backgroundColor: '#53d6f2',
      alignItems: 'center',
      justifyContent: 'center',
    },
    middleContent__text2:{
      opacity: 0.5,
      fontSize: 13,
    },
    LastNumberText:{
      opacity: 0.5,
    }
   

});

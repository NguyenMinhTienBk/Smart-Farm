import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react'
import Task from './Task';
export default function ManualList() {
    const navigation = useNavigation();
  
    
    const handleManual = () => {
        navigation.navigate("ManualView2");
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Danh sách lịch tưới</Text>
                <Text style={styles.headerText1}>bạn có 0 danh sách lịch tưới ngày hôm nay !</Text>
            </View>
            <ScrollView>
                <Task />
            </ScrollView>
            <TouchableOpacity onPress={handleManual}>
                <View style={styles.IconWrapper}>
                    <Text style={styles.icon}>+</Text>
                </View>
            </TouchableOpacity>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 20,

        backgroundColor: "#1F1D47",
    },
    header: {
        marginBottom: 15,
    },
    headerText: {
        color: "#FFFFFF",
        fontSize: 24,
    },
    headerText1: {
        color: "#FFFFFF",
        fontSize: 17,
        opacity: 0.5,
    },
    IconWrapper: {

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
    icon: {
        fontSize: 40,
        color: "#FFFFFF",
    },
});

import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const CheckVermin = () => {
  const [image, setImage] = useState(null);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.log("Error selecting image: ", error);
    }
  };

  const checkVermin = () => {
    // do vermin check here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sử dụng model AI phát hiện sâu bọ</Text>
      <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <Text style={styles.buttonText}>Tải lên 1 tệp ảnh</Text>
        )}
      </TouchableOpacity>
      <Button title="Kiểm tra" onPress={checkVermin} disabled={!image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  imageButton: {
    backgroundColor: "#DDDDDD",
    width: "80%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    borderStyle: "dashed",
    borderWidth: 1,
    height: 40,

    alignItems: "center",
    lineHeight: 40,
  },
});

export default CheckVermin;

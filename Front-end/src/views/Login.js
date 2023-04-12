import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import client from "../api/client";

const LoginScreen = () => {
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorType, setErrorType] = useState(""); // khởi tạo state errorType
  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userFinal, setUserFinal] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    console.log(userFinal);
    if (email === "" || password === "") {
      Alert.alert("Thông báo", "Hãy điền đầy đủ thông tin");
      return;
    }

    const res = await client.post("/sign-in", {
      // truy cập tới database để kiểm tra và thêm user
      ...userFinal,
    });
    console.log(res.data);
    if (res && res.data.success === false) {
      Alert.alert("Thông báo", "Sai email hoặc password hoặc cả hai");
      setEmail("");
      setPassword("");
      return;
    }

    setEmail("");
    setPassword("");
    navigation.navigate("Option");
  };

  useEffect(() => {
    setUserFinal({
      email: email,
      password: password,
    });
  }, [email, password]);
  const image = {
    uri: "https://i.pinimg.com/564x/eb/23/16/eb2316a4c199cb12436f6b9f440a2330.jpg",
  };

  // const user = { id: 101, username: 'tuanquyen', password: '123456' }

  // const handleLogin = () => {
  //   if (email === "icetea@hcmut.edu.vn" && password === "12345678") {
  //     // đăng nhập thành công
  //     navigation.navigate("Option");
  //   } else {
  //     // đăng nhập thất bại
  //     if (!email && !password) {
  //       setErrorType("Bạn chưa nhập email và mật khẩu");
  //     } else if (!email) {
  //       setErrorType("Bạn chưa nhập email");
  //     } else if (!password) {
  //       setErrorType("Bạn chưa nhập mật khẩu");
  //     } else {
  //       setErrorType("Sai thông tin đăng nhập");
  //     }
  //     setErrorModalVisible(true);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập tài khoản</Text>
      <View style={styles.form}>
        <Text style={styles.bigTitle}>Chào mừng</Text>
        <Text style={styles.formTitle}>Đăng nhập tài khoản của bạn</Text>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Mật khẩu:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Quên mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.createAccount}>
            Bạn chưa có tài khoản. Tạo ngay
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={errorModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalText}> {errorType} </Text>
            <TouchableOpacity
              onPress={() => {
                setErrorModalVisible(false);
                setErrorType(""); // reset lại giá trị errorType
              }}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1F1D47",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "stretch",
    flex: 2,
    marginTop: 50,
    color: "#fff",
  },

  bigTitle: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  form: {
    alignSelf: "stretch",
    flex: 5,
  },
  formTitle: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    color: "#000",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#29B6F6",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 10,
    textAlign: "right",
    color: "red",
  },
  createAccount: {
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "red",
  },
  modalButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import arrow from '../assets/arrow.png';
import arrowLeft from '../assets/arrowleft.png';
import eyesOpened from '../assets/eyes-opened.png';
import eyesClosed from "../assets/eyes-closed.png";
import {
  Text, View, Image, TextInput, Dimensions,
  ScrollView, StyleSheet, TouchableOpacity
} from "react-native";
import { login } from "../services/auth";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [userFetchData, setUserFetchData] = useState({});
  const [userInfo, setUserInfo] = useState({
    username: "bob@gmail.com",
    password: "123456"
  });

  async function handleLogin() {
      const data = await login(userInfo);
      setUserFetchData(data);
     navigation.navigate("Catalog");
  }

  return (
    <ScrollView style={theme.container}>
      <View style={theme.navContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
        >
          <Image source={arrowLeft} style={{ width: 18, height: 18, marginHorizontal: 16, }} />
        </TouchableOpacity>
        <Text style={text.navText}>MovieFlix</Text>
      </View>
      <View style={theme.form}>
        <View style={theme.loginTextContainer}>
          <Text style={text.textLogin}>Login</Text>
        </View>
        <View>
          <TextInput
            style={text.textInputLogin}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={userInfo.username}
            onChangeText={(e) => {
              const newUserInfo = { ...userInfo };
              newUserInfo.username = e;
              setUserInfo(newUserInfo);
            }}
          />
          <View style={theme.passwordGroup}>
            <TextInput
              style={text.textInputLogin}
              placeholder="Senha"
              autoCapitalize="none"
              secureTextEntry={hidePassword}
              value={userInfo.password}
              onChangeText={(e) => {
                const newUserInfo = { ...userInfo };
                newUserInfo.password = e;
                setUserInfo(newUserInfo);
              }}
            />
            <TouchableOpacity
              onPress={() => setHidePassword(!hidePassword)}
              style={{ marginLeft: -40 }}
            >
              <Image
                source={hidePassword ? eyesOpened : eyesClosed}
                style={{ width: 21, height: 22, }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={theme.buttonContainer}
          activeOpacity={0.8}
          onPress={() => handleLogin()}
        >
          <Text style={text.buttonText}>FAZER LOGIN</Text>
          <View style={theme.arrowContainer}>
            <Image source={arrow} style={{ width: 7, height: 14, }} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

}

const text = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000000",
    textAlign: "center",
    width: "100%",
  },
  navText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textLogin: {
    fontSize: 30,
    fontWeight: "normal",
    color: "#ffffff",
  },

  textInputLogin: {
    height: 50,
    width: 334,
    backgroundColor: "#FEFEFE",
    paddingHorizontal: 15,
    color: "#bfbfbf",
    fontSize: 16,
    fontWeight: "normal",
    borderRadius: 10,
  },
});

const theme = StyleSheet.create({
  container: {
    backgroundColor: "#525252",
    width: deviceWidth,
    height: deviceHeight,
  },
  form: {
    width: '100%',
    height: '100%',
    backgroundColor: "#525252",
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 40,
  },

  buttonContainer: {
    width: "100%",
    backgroundColor: "#FFC700",
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 96,
    marginTop: 50,
    marginLeft: -50,
  },

  arrowContainer: {
    height: 50,
    width: 50,
    backgroundColor: "#6C6C6C",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  navContainer: {
    width: "100%",
    flexDirection: "row",
    height: 50,
    backgroundColor: "#FFC700",
    paddingVertical: 13,
  },

  //login
  loginTextContainer: {
    marginTop: 96,
    marginBottom: 50,    
  },

  passwordGroup: {
    marginTop: 30,
    marginLeft: -20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

});
export default Login;
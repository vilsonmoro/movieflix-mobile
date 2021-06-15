import React from "react";
import { TouchableOpacity, Text, View, Dimensions, StyleSheet, Image } from "react-native";
import arrow from '../assets/arrow.png';
import draw from '../assets/draw.png';
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Home: React.FC = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={theme.container}>
      <View style={theme.navContainer}>
        <Text style={text.navText}>MovieFlix</Text>
      </View>

      <View style={theme.card}>
        <Image source={draw}  />
        <View style={theme.textContainer}>
          <Text style={text.bold}>Avalie Filmes</Text>
          <Text style={text.regular}>Diga o que você achou do seu filme favorito</Text>
        </View>
        <TouchableOpacity
          style={theme.buttonContainer}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Login")}
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
  regular: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center",
    color: "#f2f2f2",
    marginTop: 50,
    marginBottom: 15,
    paddingBottom: 15,
  },
  bold: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",    
    color: "#ffffff",
  },
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

});


const theme = StyleSheet.create({
  container: {
    backgroundColor: "#525252",
    width: deviceWidth,
    height: deviceHeight,
  },
  card: {
    width: "100%",
    paddingHorizontal: 37,
    paddingTop: 70,
    paddingBottom: 90,
    backgroundColor: "#525252",
    alignItems: "center",
  },
 
  textContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  buttonContainer: {
    backgroundColor: "#FFC700",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,  
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
    backgroundColor: "#FFC700",
    paddingVertical: 13,
    paddingLeft: 46,
  },
});

export default Home;
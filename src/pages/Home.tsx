import React from "react";
import { Text, View, Image } from "react-native";
import { StyleSheet } from 'react-native';
import arrow from '../assets/arrow.png';
import draw from '../assets/draw.png';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Home: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View style={theme.container}>
            <View style={theme.navContainer}>
                <Text style={text.navText}>MovieFlix</Text>
            </View>

            <View style={theme.card}>
                <Image source={draw} style={theme.draw} />
                <View style={theme.textContainer}>
                    <Text style={text.bold}>Avalie Filmes</Text>
                    <Text style={text.regular}>Diga o que você achou do seu <br /> filme favorito</Text>
                </View>

                <TouchableOpacity
                    style={theme.buttonContainer}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={text.buttonText}>FAZER LOGIN</Text>
                    <View style={theme.arrowContainer}>
                        <Image source={arrow} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const text = StyleSheet.create({
    regular: {
        fontSize: 16,
        fontWeight: "normal",
        textAlign: "center",
        color: "#f2f2f2",
        marginTop: 50,
       
    },
    bold: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: "#ffffff",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#000000",
        marginLeft: 86,  
        width: "100%", 
    },
    navText:{
        fontSize: 18,
        fontWeight: "bold",
    },  

});


const theme = StyleSheet.create({
    container: {
       backgroundColor: "#525252",               
    },
    card: {
        backgroundColor: "#525252",
        alignItems: "center",     
        paddingTop: 70,          
    },
    draw: {
        width: 340,
        height: 251,
    },
    textContainer: {
        paddingHorizontal: 20,
        marginTop: 40,
    },
    buttonContainer: {
        width: 330,
        height: 50,
        backgroundColor: "#FFC700",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 80,
        marginTop: 50,
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

    navContainer:{
       width: "100%",
       height: 50,
       backgroundColor: "#FFC700",
       paddingVertical: 13,
       paddingLeft: 46,
    },   
});


export default Home;
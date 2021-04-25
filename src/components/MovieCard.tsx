import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, ImageSourcePropType } from 'react-native';
import { useNavigation } from "@react-navigation/native";


interface MovieProps {
    id: Number;
    title: string;
    subtitle: string;
    year: Number;
    imgUrl: ImageSourcePropType;
}

const MovieCard: React.FC<MovieProps> = ( {id, title, subtitle, year, imgUrl}) => {
    const navigation = useNavigation();
    return (
        <View style={theme.container}>
            <Image source={imgUrl} style={theme.draw} />
            <Text style={theme.title}> {title} </Text>
            <Text style={theme.year}> {year} </Text>
            <Text style={theme.subtitle}> {subtitle} </Text>
            <TouchableOpacity 
                style={theme.buttonDetalhe} 
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Details", { id })}
                >
                <Text style={theme.textDetalhe}>Ver detalhes</Text>
            </TouchableOpacity>
        </View>
    )
}

const theme = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#6C6C6C",
        borderRadius: 10,
        marginTop: 18,
        paddingTop: 18,
    },
    draw: {
        width: "100%",
        height: 227,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffffff",
        marginLeft: 15,
    },
    year: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#FFC700",
        marginLeft: 15,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "normal",
        color: "#cdcdcd",
        marginLeft: 15, 
    },
    buttonDetalhe:{
       height: 40,
       borderRadius: 10,
       borderColor: "#E1E1E1",
       borderWidth: 1,
       backgroundColor: "#6C6C6C",
       marginHorizontal: 15,
       marginBottom: 20,
       marginTop: 10,
       alignItems: "center",
       justifyContent:"center",      

    },
    textDetalhe:{
        fontSize: 14,
        fontWeight: "bold",
        color: "#ffffff",
        textTransform: "uppercase",
    },
})

export default MovieCard;
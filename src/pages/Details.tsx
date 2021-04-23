import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';


import movie from '../assets/movie.png';
import { StyleSheet } from 'react-native';


const Details: React.FC = () => {
    return (
        <View style={theme.container}>
            <View style={theme.navContainer}>
                <Text style={theme.navText}>MovieFlix</Text>
            </View>
            <View style={theme.card}>
                <Text style={theme.title}>
                    O retorno do rei
                </Text>
                <Image source={movie} style={theme.draw} />
                <Text style={theme.year}>2009</Text>
                <Text style={theme.subtitle}>O inimigo está se movendo</Text>
                <Text style={theme.sinopse}>Sinopse</Text>
                <Text style={theme.textSinopse}>
                    O confronto final entre as forças do bem e do mal que lutam pelo controle do futuro da Terra Média se aproxima.
                    Sauron planeja um grande ataque a Minas Tirith, capital de Gondor, o que faz com que Gandalf e Pippin partam
                    para o local na intenção de ajudar a resistência. Um exército é reunido por Theoden em Rohan, em mais uma
                    tentativa de deter as forças de Sauron. Enquanto isso,
                    Frodo, Sam e Gollum seguem sua viagem rumo à Montanha da Perdição para destruir o anel.
                </Text>
            </View>
            <View style={theme.card}>
                <TextInput
                    style={theme.inputAvaliacao}
                    placeholder="Deixe sua avaliação aqui."
                />
                <TouchableOpacity
                    style={theme.buttonAvaliar}
                >
                    <Text>Salvar avaliação</Text>
                </TouchableOpacity>
            </View>

            <View style={theme.card}>
                <Text style={theme.textAvaliar}>Avaliações</Text>
                <Text style={theme.textAutor}>Autor</Text>
                <Text style={theme.textSinopse}>Gosti mutio</Text>
            </View>
        </View>
    )
}

const theme = StyleSheet.create({
    container: {
        backgroundColor: "#525252",
        width: "100%",
    },
    draw: {
        width: "100%",
        height: 227,
    },
    card: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#6C6C6C",
        borderRadius: 10,
        marginVertical: 18,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginLeft: 25,
    },
    year: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFC700",
        marginLeft: 25,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "normal",
        color: "#9E9E9E",
        marginLeft: 25,
    },
    sinopse: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginLeft: 25,
        marginTop: 15,
    },
    textSinopse: {
        fontSize: 16,
        fontWeight: "normal",
        color: "#9E9e9E",
        paddingHorizontal: 19,
        paddingVertical: 13,
        marginHorizontal: 21,
        marginTop: 7,
        marginBottom: 14,
        borderColor: "#e1e1e1",
        borderWidth: 1,
        borderRadius: 20,
    },
    navContainer: {
        width: "100%",
        height: 50,
        backgroundColor: "#FFC700",
        paddingVertical: 13,
        paddingLeft: 46,
    },
    navText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
    },
    inputAvaliacao: {
        height: 90,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e1e1e1",
        marginTop: 25,
        marginHorizontal: 20,
        paddingHorizontal: 15,
        fontSize: 16,
        fontWeight: "normal",
        color: "#9E9E9E",
    },
    buttonAvaliar: {
        height: 50,
        backgroundColor: "#FFC700",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 18,
        marginTop: 13,
        marginHorizontal: 20,
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
        textTransform: 'uppercase',
    },
    textAvaliar: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginLeft: 25,
        marginRight: 15,
        marginVertical: 15,
    },

    textAutor: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginLeft: 40,
    },

})

export default Details;
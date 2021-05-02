import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import arrowLeft from '../assets/arrowleft.png';
import { StyleSheet, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { doLogout, userToken } from '../services/auth';
import { api } from '../services';
import { useNavigation } from "@react-navigation/native";

const deviceWidth = Dimensions.get('window').width;

const Details = ({ route: {
    params: { id },
},
}
) => {
    const navigation = useNavigation();

    const [movie, setMovie] = useState({
        id: null,
        title: null,
        subTitle: null,
        year: Number,
        imgUrl: null,
        synopsis: null,
        reviews: [{
            text: null,
            user: {
                name: null,
            }
        },]
    });

    const [loading, setLoading] = useState(false);
    const [avaliacao, setAvaliacao] = useState("");

    async function getMovie() {
        const authToken = await userToken();
        setLoading(true);
        const res = await api.get(`/movies/${id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        });
        setMovie(res.data);
        setLoading(false);
      }

    useEffect(() => {
        getMovie();
    }, []);

    async function handleLogout() {
        doLogout();
        navigation.navigate("Home");
    }
    async function handleSaveReview() {

        const authToken = await userToken();
        const data = avaliacao;       
        const res = await api.post(`/reviews`, data, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        });
    }

    return (
        <View style={theme.container}>
            <View style={theme.navContainer}>
                <View style={theme.navGoback}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Catalog")}
                    >
                        <Image source={arrowLeft} style={{ width: 18, height: 18, marginHorizontal: 16, }} />
                    </TouchableOpacity>
                    <Text style={theme.navText}>MovieFlix</Text>
                </View>
                <TouchableOpacity
                    onPress={() => handleLogout()}
                    style={theme.logout}
                >
                    <Text >Sair</Text>
                </TouchableOpacity>
            </View>
            {
                loading ? (<ActivityIndicator size='large' />) : (
                    <View>
                        <View style={theme.card}>
                            <Text style={theme.title}>
                                {movie.title}
                            </Text>
                            <Image source={movie.imgUrl} style={theme.draw} />
                            <Text style={theme.year}>
                                {movie.year}
                            </Text>
                            <Text style={theme.subtitle}>
                                {movie.subTitle}
                            </Text>
                            <Text style={theme.sinopse}>Sinopse</Text>
                            <Text style={theme.textSinopse}>
                                {movie.synopsis}
                            </Text>
                        </View>
                        {
                            //visivel somente se usuario é MEMBER
                            <View style={theme.card}>
                                <TextInput
                                    style={theme.inputAvaliacao}
                                    placeholder="Deixe sua avaliação aqui."
                                    value={avaliacao}
                                    onChangeText={(e) => {
                                        setAvaliacao(e);
                                      }
                                    }
                                />
                                <TouchableOpacity
                                    style={theme.buttonAvaliar}
                                    onPress={() => handleSaveReview()}
                                >
                                    <Text>Salvar avaliação</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {
                            movie.reviews.map(review => (
                                <View style={theme.card}>
                                    <Text style={theme.textAvaliar}>Avaliações</Text>
                                    <Text style={theme.textAutor}>{review.user.name}</Text>
                                    <Text style={theme.textSinopse}>{review.text}</Text>
                                </View>
                            )

                            )
                        }
                    </View>
                )
            }
        </View>
    )
}

const theme = StyleSheet.create({
    container: {
        backgroundColor: "#525252",
        width: deviceWidth,
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
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        width: deviceWidth,
        height: 50,
        backgroundColor: "#FFC700",
        paddingVertical: 13,

    },
    navGoback: {
        flexDirection: "row",
        justifyContent: 'space-between',
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
    logout: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000000",
        marginRight: 10,
        width: 75,
        height: 26,
        textAlign: 'center',
        paddingTop: 3,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
    },

})

export default Details;
import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ToastAndroid } from 'react-native';
import arrowLeft from '../assets/arrowleft.png';
import star from '../assets/star.png';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { doLogout, isAllowedByRole, userToken } from '../services/auth';
import { api } from '../services';
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';

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
            id: 0,
            text: null,
            user: {
                name: null,
            }
        },]
    });

    const [loading, setLoading] = useState(false);
    const [avaliacao, setAvaliacao] = useState("");
    const [podeAvaliar, setPodeAvaliar] = useState(false);

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
        setAvaliacao("");
        handlePodeAvaliar();
    }

    useEffect(() => {
        getMovie();
    }, []);

    async function handleLogout() {
        doLogout();
        navigation.navigate("Home");
    }

    async function handlePodeAvaliar() {
        const pode = await isAllowedByRole(['ROLE_MEMBER']);
        setPodeAvaliar(pode);
    }

    async function handleSaveReview() {
        const authToken = await userToken();
        const data = { movieId: movie.id, text: avaliacao };
        const res = await api.post(`/reviews`, data, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        getMovie();
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
                            podeAvaliar ? (
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
                                </View>)
                                : (<View></View>)
                        }
                        {
                            movie.reviews.map(review => (
                                <ScrollView contentContainerStyle={theme.card} key={review.id}>
                                    <Text style={theme.textAvaliar}>Avaliações</Text>
                                    <View style={theme.containerAutor}>
                                        <Image source={star} style={{ width: 12, height: 12, }} />
                                        <Text style={theme.textAutor}>{review.user.name}</Text>
                                    </View>
                                    
                                    <Text style={theme.textSinopse}>{review.text}</Text>
                                </ScrollView>

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
        margin: 0,
        backgroundColor: "#525252",
    },

    draw: {
        width: "100%",
        height: 227,
        marginTop: 15,
        resizeMode: 'stretch',
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
        marginTop: 17,
    },
    year: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFC700",
        marginLeft: 25,
        marginTop: 14,
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
        paddingLeft: 15,    
    },
    logout: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000000",
        marginRight: 20,
        marginVertical: 14,
        width: 75,
        height: 26,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
    },

    containerAutor: {
       display: 'flex',
       flexDirection: 'row',
       marginLeft: 39,
       paddingVertical: 4,
    },

})

export default Details;
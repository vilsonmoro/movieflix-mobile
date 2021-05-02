import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import MovieCard from '../components/MovieCard';
import { api } from '../services';
import { doLogout, userToken } from '../services/auth';
import { useNavigation } from "@react-navigation/native";

const deviceWidth = Dimensions.get('window').width;

const Catalog: React.FC = () => {
    const navigation = useNavigation();

    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fillMovies() {
        const authToken = await userToken();
        setLoading(true);
        const res = await api.get(`/movies?page=0&linesPerPage=12&direction=ASC`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        });
        setMovies(res.data.content);
        setLoading(false);
    }

    useEffect(() => {
        fillMovies();
    }, []);

    async function handleLogout() {
        doLogout();
        navigation.navigate("Home");
    }

    return (
        <View style={theme.container}>
            <View style={theme.navContainer}>
                <Text style={theme.navText}>MovieFlix</Text>
                <TouchableOpacity
                    onPress={() => handleLogout()}
                    style={theme.logout}
                >
                    <Text >Sair</Text>
                </TouchableOpacity>
            </View>
            <View style={theme.filterContainer}>
                <Text>Aventura</Text>
            </View>
            <ScrollView contentContainerStyle={theme.scrollContainer}>
                {loading ? (<ActivityIndicator size='large' />)
                    : (movies.map(movie => (
                        <MovieCard {...movie}  key={movie.id}/>
                    )))
                }
            </ScrollView>
        </View>
    )
}

const theme = StyleSheet.create({
    container: {
        backgroundColor: "#525252",
        width: deviceWidth,
    },
    filterContainer: {
        height: 80,
        backgroundColor: "#6C6C6C",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginTop: 17,
        borderRadius: 10,
        marginHorizontal: 20,
        padding:20,
    },
    navContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: deviceWidth,
        height: 50,
        backgroundColor: "#FFC700",
        paddingVertical: 13,
        paddingLeft: 46,
    },
    navText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    scrollContainer: {
        padding: 20,
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
export default Catalog;
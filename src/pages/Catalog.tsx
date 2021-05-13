import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import MovieCard from '../components/MovieCard';
import { api } from '../services';
import { doLogout, userToken } from '../services/auth';
import { useNavigation } from "@react-navigation/native";
import Select from 'react-native-select-plus';

type IGenre = {
    id: string;
    name: string;
}

const Catalog: React.FC = () => {
    const navigation = useNavigation();

    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState<IGenre[]>([{ id: '1', name: 'eletronciso' }]);
    const [genre, setGenre] = useState('');
    const [loading, setLoading] = useState(false);

    async function fillGenres() {
        const authToken = await userToken();
        setLoading(true);
        const res = await api.get(`/genres`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        });
        console.log(res);
        setGenres(res.data);
        setLoading(false);
    }

    async function fillMovies() {
        const authToken = await userToken();
        setLoading(true);
        const url = genre ? `&genreId=${genre}` : ``;
        const res = await api.get(`/movies?page=0&linesPerPage=12&direction=ASC${url}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        });
        setMovies(res.data.content);
        console.log(`genero = ${genre}`);
        setLoading(false);
    }

    useEffect(() => {
        fillGenres();
    }, []);

    useEffect(() => {
        fillMovies();
    }, [genre]);

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
                <select
                    style={{
                        backgroundColor:"#6C6C6C",
                        fontSize: 22,
                        fontWeight: "normal",
                        color:"#ffffff",
                        padding: 15,         
                        borderColor: "#E1E1E1",
                        borderWidth: 1,  
                        borderRadius: 10,             
                    }}
                    onChange={event => setGenre(event.target.value)}
                >
                    <option value={''}>Selecione um gênero</option>
                    {genres.map(gr => (<option value={gr.id}>{gr.name}</option>))}
                </select>

            </View>
            <ScrollView contentContainerStyle={theme.scrollContainer}>
                {loading ? (<ActivityIndicator size='large' />)
                    : (movies.map(movie => (
                        <MovieCard {...movie} key={movie.id} />
                    )))
                }
            </ScrollView>
        </View>
    )
}

const theme = StyleSheet.create({
    container: {
        backgroundColor: "#525252",
    },
    filterContainer: {
        height: 80,
        backgroundColor: "#6C6C6C",
        shadowColor: "#00000025",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginTop: 17,
        borderRadius: 10,
        marginHorizontal: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    navContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
        marginRight: 20,
        marginHorizontal: 14,
        width: 75,
        height: 26,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
    },
    filterText: {
        fontWeight: 'normal',
        fontSize: 22,
        color: "#FFFFFF",
        backgroundColor: "E1E1E1"
    },
})
export default Catalog;
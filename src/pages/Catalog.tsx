import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import MovieCard from '../components/MovieCard';
import { StyleSheet } from 'react-native';
import movie from '../assets/movie.png';
import { api } from '../services';


const Catalog: React.FC = () => {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fillMovies() {
        setLoading(true);
        const res = await api.get(`/movies?page=0&linesPerPage=12&direction=ASC`);
        setMovies(res.data.content);
        setLoading(true);    }

    useEffect(() => {
        fillMovies();
    }, [])

    return(
      <View style={theme.container}>
          <View style={theme.navContainer}>
                <Text style={theme.navText}>MovieFlix</Text>
            </View>
          <View style={theme.filterContainer}>
              <Text>Aventura</Text>
          </View>
          <ScrollView contentContainerStyle={theme.scrollContainer}>
               {   loading ? (<ActivityIndicator size='large' />)
                   : (movies.map( movie => (
                       <MovieCard {...movie}/>
                   )))
               }
          </ScrollView>
        </View>
    )
}

const theme = StyleSheet.create({
    container: {
       backgroundColor: "#525252",
       width: "100%",   
    },
    filterContainer:{
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
        padding: 20,
    },
    navContainer:{
        width: "100%",
        height: 50,
        backgroundColor: "#FFC700",
        paddingVertical: 13,
        paddingLeft: 46,
     },  
     navText:{
        fontSize: 18,
        fontWeight: "bold",
    },
    scrollContainer: {
        padding: 20,
    },
})
export default Catalog;
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text, View, StyleSheet,
  TouchableOpacity, ScrollView,
  ActivityIndicator, Modal,
  Image
} from "react-native";
import { doLogout, userToken } from "../services/auth";
import { api } from "../services";
import MovieCard from "../components/MovieCard";
import { seta } from "../assets/Seta.png";

type IGenre = {
  id: string;
  name: string;
}

const Catalog: React.FC = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [genre, setGenre] = useState([]);
  const [showGenre, setShowGenre] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fillGenres() {
    const authToken = await userToken();
    setLoading(true);
    const res = await api.get(`/genres`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    });
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
    <ScrollView contentContainerStyle={theme.container}>
      <View style={theme.navContainer}>
        <Text style={theme.navText}>MovieFlix</Text>
        <TouchableOpacity
          onPress={() => handleLogout()}
        >
          <Text style={theme.logout}>Sair</Text>
        </TouchableOpacity>
      </View>
      <View style={theme.filterContainer}>
        <TouchableOpacity
          style={theme.itemFilterContainer}
          onPress={() => {
            setShowGenre(!showGenre);
          }}
        >
          <Text style={theme.textGenre}>
            {genre ? 'Escolha um genero' : genre.name}
          </Text>
          <Image source={seta} style={{ width: 9, height: 14}} />
        </TouchableOpacity>
        <ScrollView>
          <Modal
            visible={showGenre}
          >
            <View style={theme.modalContainer}>
              <ScrollView contentContainerStyle={theme.modalContent}>
                {genres.map(g => (
                  <TouchableOpacity
                    style={theme.modalItem}
                    key={g.id}
                    onPress={
                      () => {
                        setGenre(g.id);
                        setShowGenre(!showGenre);
                      }
                    }
                  >
                    <Text style={theme.textGenre}> {g.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>
        </ScrollView>
      </View>
      <View style={theme.scrollContainer}>
        {
          loading ? (<ActivityIndicator size='large' />)
            : (movies.map(movie => (
              <MovieCard {...movie} key={movie.id} />
            )))
        }
      </View>
    </ScrollView>
  );

}


const theme = StyleSheet.create({
  container: {
    backgroundColor: "#525252",
    paddingBottom: 60,
  },
  filterContainer: {
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
  itemFilterContainer:{
    display: "flex",
    borderRadius: 10,
    borderColor: '#E1E1E1',
    borderWidth: 2,
    padding: 12,
  },

  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    backgroundColor: "#FFC700",
    paddingVertical: 13,
    paddingLeft: 51,
  },
 
  navText: {
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
  },
  scrollContainer: {
    padding: 20,
  },
  logout: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    marginRight: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },

  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#00000025",
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  
  modalContent: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "10%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalItem: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,    
    backgroundColor: "#6C6C6C",
  },
  textGenre: {
    fontWeight: 'normal',
    fontSize: 16,
    color: "#FFFFFF",    
  }
})

export default Catalog;
import React, { useEffect, useState, useRef } from "react";
import { ScrollView, View, Image, StyleSheet, Dimensions } from "react-native";
import { Avatar, Text, Center, HStack } from "native-base";

import Carousel from "react-native-snap-carousel";

import MarvelService from "../services/MarvelService";

import { ErrorComponent } from "../components";

const { width } = Dimensions.get("window");

export const Home = () => {
  const carrouselRef = useRef(null);
  const [comicsList, setComicsList] = useState(null);
  const [charactersList, setCharactersList] = useState(null);

  const renderItem = ({ comic }) => {
    return (
      <View>
        <Image
          resizeMode="center"
          style={styles.imageComic}
          source={{
            uri: comic.thumbnail.path + "." + comic.thumbnail.extension,
          }}
        />
        <Center>
          <Text style={styles.titleComic} fontSize="lg">
            {comic.title}
          </Text>
        </Center>
      </View>
    );
  };

  useEffect(() => {
    getRandomComics();
    getRandomCharacters();
  }, []);

  const getRandomComics = () => {
    if (!comicsList) {
      MarvelService.getRandomComics()
        .then((responseComics) => {
          console.log(responseComics);
          setComicsList(responseComics);
        })
        .catch((error) => {
          console.error({ error });
        });
    }
  };

  const getRandomCharacters = () => {
    if (!charactersList) {
      MarvelService.getRandomCharacters()
        .then((responseCharacters) => {
          console.log(responseCharacters);
          setCharactersList(responseCharacters);
        })
        .catch((error) => {
          console.error({ error });
        });
    }
  };

  return (
    <View style={styles.container}>
      {comicsList && (
        <Carousel
          layout="default"
          ref={carrouselRef}
          data={comicsList}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width - 150}
        />
      )}
      {charactersList && (
        <HStack
          space={3}
          alignItems="center"
          style={{ marginTop: 20, marginLeft: 10 }}
        >
          <ScrollView horizontal={true}>
            {charactersList
              .filter(
                ({ thumbnail }) =>
                  thumbnail.path !==
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
              )
              .map((character, index) => (
                <View key={index} style={styles.avatar}>
                  <Avatar
                    size="xl"
                    source={{
                      uri:
                        character.thumbnail.path +
                        "." +
                        character.thumbnail.extension,
                    }}
                  />
                  <View style={{ maxWidth: 100 }}>
                    <Text style={styles.nameCharacter} fontSize="xs">
                      {character.name}
                    </Text>
                  </View>
                </View>
              ))}
          </ScrollView>
        </HStack>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  imageComic: {
    width: "100%",
    height: 300,
  },
  titleComic: {
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 20,
    color: "#ffffff",
  },
  avatar: {
    marginRight: 15,
  },
  nameCharacter: {
    marginTop: 5,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
});

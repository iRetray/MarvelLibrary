import React, { useEffect, useState } from "react";

import { ScrollView, View, Image, StyleSheet, Dimensions } from "react-native";
import { Avatar, Text, Center, HStack, Heading, Divider } from "native-base";
import Carousel from "react-native-snap-carousel";

import MarvelService from "../services/MarvelService";

const { width } = Dimensions.get("window");

const CarouselItem = React.memo(({ thumbnail, title }) => {
  return (
    <View>
      <Image
        resizeMode="center"
        style={styles.imageComic}
        source={{
          uri: thumbnail.path + "." + thumbnail.extension,
        }}
      />
      <Center>
        <Text style={styles.titleComic} fontSize="md">
          {title}
        </Text>
      </Center>
    </View>
  );
});

export const Home = () => {
  const [comicsList, setComicsList] = useState(null);
  const [charactersList, setCharactersList] = useState(null);
  const [seriesList, setSeriesList] = useState(null);

  useEffect(() => {
    getRandomComics();
    getRandomCharacters();
    getRandomSeries();
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

  const getRandomSeries = () => {
    if (!seriesList) {
      MarvelService.getRandomSeries()
        .then((responseSeries) => {
          console.log(responseSeries);
          setSeriesList(responseSeries);
        })
        .catch((error) => {
          console.error({ error });
        });
    }
  };

  return (
    <View style={styles.container}>
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
      <Divider my="5" bgColor="#bfbfbf" />
      <Heading style={styles.headers}>Series</Heading>
      {seriesList && (
        <Carousel
          style={{ marginTop: 15 }}
          layout="default"
          initialNumToRender={1}
          data={seriesList}
          renderItem={({ item }) => (
            <CarouselItem thumbnail={item.thumbnail} title={item.title} />
          )}
          sliderWidth={width}
          itemWidth={width - 200}
          removeClippedSubviews={true}
        />
      )}
      <Divider my="5" bgColor="#bfbfbf" />
      <Heading style={styles.headers}>Comics</Heading>
      {comicsList && (
        <Carousel
          style={{ marginTop: 15 }}
          layout="default"
          initialNumToRender={1}
          data={comicsList}
          renderItem={({ item }) => (
            <CarouselItem thumbnail={item.thumbnail} title={item.title} />
          )}
          sliderWidth={width}
          itemWidth={width - 200}
          removeClippedSubviews={true}
        />
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
  imageSerie: {
    width: "100%",
    height: 200,
  },
  headers: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
    padding: 10,
  },
});

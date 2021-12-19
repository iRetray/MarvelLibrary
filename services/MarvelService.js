import axios from "axios";

const baseURL = "http://gateway.marvel.com/v1/public";
const timestamp = "3010";
const publicKey = "eacd6d5095a28da66e5ec0b846ed2b0a";
const hashMD5 = "f2c44aaeb1d8b3d75db5c42fe6a29e02";

const authHeaders = `&ts=${timestamp}&apikey=${publicKey}&hash=${hashMD5}`;
const buildRequestURL = (path) => `${baseURL}${path}${authHeaders}`;

class HttpServiceClass {
  get = (requestURL) => {
    return new Promise((resolve, reject) => {
      axios
        .get(requestURL)
        .then((response) => {
          if (response && response.status === 200) {
            const dataObject = response.data.data.results;
            resolve(dataObject);
          } else {
            reject();
          }
        })
        .catch((error) => {
          console.error({ error });
          reject();
        });
    });
  };
}

const HttpService = new HttpServiceClass();

class MarvelService {
  getRandomComics() {
    return HttpService.get(
      buildRequestURL(`/comics?limit=15&dateDescriptor=thisMonth`)
    );
  }

  getRandomCharacters() {
    return HttpService.get(
      buildRequestURL(`/characters?limit=30&orderBy=modified`)
    );
  }

  getRandomSeries() {
    return HttpService.get(
      buildRequestURL(`/series?limit=10&orderBy=modified`)
    );
  }
}

export default new MarvelService();

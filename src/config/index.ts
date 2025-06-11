import axios from 'axios';

const config = {
  FORM: {
    MAX_MESSAGE_LENGTH: 200,
  },
  URL: {
    API: {
      ALL_COUNTRY_DATA: 'https://restcountries.com/v3.1/all',
      RICK_AND_MORTY: 'https://rickandmortyapi.com/graphql',
      SEND_EMAIL: 'https://formspree.io/f/xdkgvdaq',
      USDA_FOOD: 'https://api.nal.usda.gov/fdc/v1',
      SPOONACULAR: 'https://api.spoonacular.com',
      FOOD_OASIS:
        process.env.NODE_ENV === 'production'
          ? 'https://zs39isn4zj.us-west-2.awsapprunner.com'
          : 'http://localhost:8000',
    },
  },
};

export const faoApi = axios.create({
  baseURL: config.URL.API.FOOD_OASIS,
});

export default config;

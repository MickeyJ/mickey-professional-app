import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

import config from "@/config";
import type { Character } from "@/types";

const client = new ApolloClient({
  uri: config.URL.API.RICK_AND_MORTY,
  cache: new InMemoryCache(),
});

export const getCharacterData = async (page: number = 1, name: string) =>
  await client.query({
    query: gql`
      query {
        characters(page: ${page}, filter: { name: "${name}" }) {
          info {
            count
          }
          results {
            id
            name
            image
            species
            status
            location {
              name
            }
          }
        }
      
      }
    `,
  });

export const loadingCharacterData = (cardsPerPage: number): Character[] => {
  return Array.from({ length: cardsPerPage }, (_, i) => ({
    id: i * 10000,
    name: "Loading...",
    image: "/person-image-placeholder.png",
    location: {
      name: "Loading...",
    },
  }));
};

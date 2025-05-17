import config from '@/config';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

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

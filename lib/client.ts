import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://fragrant-shadow-9470.fly.dev/",
  cache: new InMemoryCache(),
});

export default client;

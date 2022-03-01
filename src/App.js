import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  setContext,
} from "@apollo/client";

import { NavBar } from "./components/NavBar";
import { AppRouter } from "./components/AppRouter";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </ApolloProvider>
  );
};

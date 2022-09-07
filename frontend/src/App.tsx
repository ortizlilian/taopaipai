import React  from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AppLaunch from "./pages/AppLaunch";
import NoPage from "./pages/NoPage";
import "./styles/App.css";

function App() {
    const client = new ApolloClient({
        uri: "http://127.0.0.1:3001/graphql",
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="app" element={<AppLaunch />} />
                <Route path="*" element={<NoPage />} />
            </Route>
            </Routes>
        </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;

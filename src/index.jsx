import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import store from './redux/store';
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import "bootstrap/./dist/css/bootstrap.min.css";
import "./index.scss";

//main component
const App = () => {
    return (
    <Container>
      <MainView />
    </Container>
    );
    return (
    <Container>
      <MainView />
    </Container>
    );
    return (
      <Provider store={store}>
       <Container>
         <MainView />
       </Container>
    </Provider>
    );
};

//finds root of app
const container = document.querySelector("#root");
const root = createRoot(container);

//tells react how to render app in root DOM element
root.render(<App />);

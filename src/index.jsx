import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import "bootstrap/dist/bootstrap.min.css";
import "./index.scss";

//main component
const App = () => {
    return <MainView />;
};

//finds root of app
const container = document.querySelector("#root");
const root = createRoot(container);

//tells react how to render app in root DOM element
root.render(<App />);
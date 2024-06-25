import { createRoot } from 'react-dom/client';

import { MainView } from "./components/main-view/main-view";
import "./index.scss";

//main component
const MyFlixApplication = () => {
    return (
        <div className="my-flix">
          <div>Good morning</div>
        </div>
    );
};

//finds root of app
const container = document.querySelector("#root");
const root = createRoot(container);

//tells react how to render app in root DOM element
root.render(<MyFlixApplication />);
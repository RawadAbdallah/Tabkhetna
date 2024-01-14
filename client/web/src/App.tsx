import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/auth";
import Home from "./pages/home";

import "./styles/reset.css";
import "./styles/global.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" Component={Auth} />
                <Route path="/" Component={Home} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

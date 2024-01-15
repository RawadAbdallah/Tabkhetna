import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/auth";
import Home from "./pages/home";

import Error from "./components/error";

import "./styles/reset.css";
import "./styles/global.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Home />} />
                {/* On the next line it is causing an error, since the Error element is expecting to pass props, but I can't pass props in the Component attribute */}
                <Route
                    path="*"
                    element={
                        <Error
                            statusCode={404}
                            errorMessage="Oh no! It seems that someone ate this page. No worries,
                        we are here to guide you back to the feast."
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

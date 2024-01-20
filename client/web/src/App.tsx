import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "@pages/auth";
import Home from "@pages/home";
import Cookmates from '@pages/cookmates'
import Profile from "@pages/profile";

import Error from "@components/error";

import "@styles/reset.css";
import "@styles/global.css";
import AdminPage from "./pages/admin";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/cookmates" element={<Cookmates />} />
                <Route path="/profile" element={<Profile />}/>
                <Route path="/admin" element={<AdminPage/>} />
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

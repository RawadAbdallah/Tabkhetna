import { BrowserRouter, Routes, Route } from "react-router-dom";

// importing pages
import Auth from "@pages/auth";
import Home from "@pages/home";
import Cookmates from "@pages/cookmates";
import Profile from "@pages/profile";
import Support from '@pages/support';
import SavedRecipes from "@pages/savedRecipes";
import Challenges from "@pages/challenges";
import PendingCookmates from "@pages/pendingCookmates";
import AdminPage from "@pages/admin";
import Error from "@/components/error";

// importing styles
import "@styles/reset.css";
import "@styles/global.css";

import withAuthentication from "@utils/withAuthentication";

// passing pages to the authentication HOC
const AuthenticatedHome = withAuthentication(Home);
const AuthenticatedCookmates = withAuthentication(Cookmates);
const AuthenticatedProfile = withAuthentication(Profile);
const AuthenticatedAdminPage = withAuthentication(AdminPage);
const AuthenticatedSavedRecipesPage = withAuthentication(SavedRecipes);
const AuthenticatedChallengesPage = withAuthentication(Challenges);
const AuthenticatedPendingCookmates = withAuthentication(PendingCookmates);
const AuthenticatedSupportPage = withAuthentication(Support);
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<AuthenticatedHome />} />
                <Route path="/cookmates" element={<AuthenticatedCookmates />} />
                <Route path="/profile/:userId" element={<AuthenticatedProfile />} />
                <Route path="/admin" element={<AuthenticatedAdminPage />} />
                <Route path="/support" element={<AuthenticatedSupportPage />} />
                <Route path="/challenges" element={<AuthenticatedChallengesPage />} />
                <Route path="/savedRecipes" element={<AuthenticatedSavedRecipesPage/>} />
                <Route path="/cookmates/pending" element={<AuthenticatedPendingCookmates/>} />
                <Route
                    path="/unauthorized"
                    element={
                        <Error
                            statusCode={401}
                            errorMessage="It seems you are not logged in. Redirecting you to Login page."
                            errorTitle="Unauthorized"
                            showGoBack={false}
                            redirection={true}
                        />
                    }
                />
                <Route
                    path="*"
                    element={
                        <Error
                            statusCode={404}
                            errorTitle="Page not found"
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

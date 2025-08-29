import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/actions";
import { useEffect } from "react";

import StartPage from "./pages/start/StartPage";
import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import WorkersPage from "./pages/workers/WorkersPage";
import MyInfoPage from "./pages/MyInfoPage";
import SkillsPage from "./pages/skills/SkillsPage";
import ServicesPage from "./pages/services/ServicesPage";

import SideNavBar from "./components/sidebar/SideNavBar";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

import { ROLES, STORAGE_KEYS } from "./constants";
import ClientsPage from "./pages/clients/ClientsPage";


function PrivateRoute({ pageToShow, allowedRoles }) {
    const isAuthenticated = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const userRole = localStorage.getItem(STORAGE_KEYS.ROLE);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles) {
        const isAllowed = allowedRoles.includes(userRole);
        if (!isAllowed) {
            return <Navigate to="/dashboard" />;
        }
    }

    return pageToShow;
}

function App() {
    const dispatch = useDispatch();
    const hasAccessToken = useSelector((state) => state.auth.accessToken);

    useEffect(() => {
        checkLocalStorageKeys();
    }, []);

    // To sync tokens for both localStorage and redux we need to do this.
    // Because when page is refreshed data in redux is gone(cuz its stored in RAM)
    function checkLocalStorageKeys() {
        const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (accessToken) {
            dispatch(authActions.setTokens(accessToken, refreshToken));
        }
    }

    return (
        <>
            <div>
                <Router>
                    {!hasAccessToken && <Header />}
                    <main>
                        {hasAccessToken && <SideNavBar />}
                        <div>
                            <Routes>
                                <Route path="/" element={<StartPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route
                                    path="/dashboard"
                                    element={<PrivateRoute pageToShow={<DashboardPage />} />}
                                />
                                <Route
                                    path="/workers"
                                    element={
                                        <PrivateRoute
                                            allowedRoles={[ROLES.MANAGER, ROLES.OWNER]}
                                            pageToShow={<WorkersPage />}
                                        />
                                    }
                                />
                                <Route
                                    path="/my-info"
                                    element={<PrivateRoute pageToShow={<MyInfoPage />} />}
                                />
                                <Route
                                    path="/skills"
                                    element={
                                        <PrivateRoute
                                            allowedRoles={[ROLES.OWNER, ROLES.MANAGER]}
                                            pageToShow={<SkillsPage />}
                                        />
                                    }
                                />
                                <Route
                                    path="/services"
                                    element={
                                        <PrivateRoute
                                            allowedRoles={[ROLES.OWNER, ROLES.MANAGER]}
                                            pageToShow={<ServicesPage />}
                                        />
                                    }
                                />
                                <Route
                                    path="/clients"
                                    element={
                                        <PrivateRoute
                                            allowedRoles={[ROLES.OWNER, ROLES.MANAGER]}
                                            pageToShow={<ClientsPage/>}
                                        />
                                    }
                                />
                            </Routes>
                        </div>
                    </main>
                    {!hasAccessToken && <Footer />}
                </Router>
            </div>
        </>
    );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import WorkersPage from "./pages/workers/WorkersPage";
import MyInfoPage from "./pages/MyInfoPage";
import StartPage from "./pages/start/StartPage";
import { ROLES, STORAGE_KEYS } from "./constants";
import SkillsPage from "./pages/skills/SkillsPage";
import ServicesPage from "./pages/services/ServicesPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./assets/style.css";
import SideNavBar from "./components/sidebar/SideNavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./redux/actions";

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
            <div className="app-shell">
                <Router>
                    {!hasAccessToken && <Header />}
                    <main
                        className="main-content"
                        style={{ flex: 1, display: "flex", flexDirection: "row" }}
                    >
                        {hasAccessToken && <SideNavBar />}
                        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
                                {/*<Route*/}
                                {/*    path="/service_types"*/}
                                {/*    elements={*/}
                                {/*        <PrivateRoute*/}
                                {/*            allowedRoles={[ROLES.OWNER, ROLES.MANAGER]}*/}
                                {/*            pageToShow={<ServiceTypesPage />}*/}
                                {/*        />*/}
                                {/*    }*/}
                                {/*/>*/}
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

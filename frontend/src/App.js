import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import WorkersPage from "./pages/WorkersPage";
import MyInfoPage from "./pages/MyInfoPage";
import StartPage from "./pages/StartPage";
import NewWorkerPage from "./pages/NewWorkerPage";
import { ROLES, STORAGE_KEYS } from "./constants";
import SkillsPage from "./pages/SkillsPage";
import ServicesPage from "./pages/ServicesPage";

function PrivateRoute({ pageToShow, allowedRoles }) {
    const isAuthenticated = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const userRole = localStorage.getItem(STORAGE_KEYS.ROLE);
    console.log("Is Auth", isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    console.log("Allowed roles", allowedRoles);
    if (allowedRoles) {
        console.log("Inside");
        const isAllowed = allowedRoles.includes(userRole);
        if (!isAllowed) {
            return <Navigate to="/dashboard" />;
        }
    }

    console.log("Element returned");
    return pageToShow;
}

function App() {
    return (
        <Router>
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
                <Route path="/my-info" element={<PrivateRoute pageToShow={<MyInfoPage />} />} />
                <Route
                    path="/workers/new"
                    element={
                        <PrivateRoute allowedRoles={[ROLES.OWNER]} pageToShow={<NewWorkerPage />} />
                    }
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
        </Router>
    );
}

export default App;

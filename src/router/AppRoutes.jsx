import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Timetable from "../pages/Timetable/Timetable";
import Subjects from "../pages/Subjects/Subjects";
import Analytics from "../pages/Analytics/Analytics";
import Settings from "../pages/Settings/Settings";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Calendar from "../pages/Calendar/Calendar";
import Layout from "../components/Layout/Layout";

function AppRoutes() {
    return (
        <Routes>

            {/* LOGIN */}
            <Route
                path="/login"
                element={<Login />}
            />

            {/* SIGNUP */}
            <Route
                path="/signup"
                element={<Signup />}
            />

            {/* DASHBOARD */}
            <Route
                path="/"
                element={
                    <Layout>
                        <Dashboard />
                    </Layout>
                }
            />

            {/* TIMETABLE */}
            <Route
                path="/timetable"
                element={
                    <Layout>
                        <Timetable />
                    </Layout>
                }
            />

            {/* SUBJECTS */}
            <Route
                path="/subjects"
                element={
                    <Layout>
                        <Subjects />
                    </Layout>
                }
            />

            {/* ANALYTICS */}
            <Route
                path="/analytics"
                element={
                    <Layout>
                        <Analytics />
                    </Layout>
                }
            />

            <Route
    path="/calendar"
    element={
        <Layout>
            <Calendar />
        </Layout>
    }
/>

            {/* SETTINGS */}
            <Route
                path="/settings"
                element={
                    <Layout>
                        <Settings />
                    </Layout>
                }
            />

        </Routes>
    );
}

export default AppRoutes;
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Timetable from "../pages/Timetable/Timetable";
import Layout from "../components/Layout/Layout";


function AppRoutes() {

    return (
        <Routes>

            {/* DASHBOARD */}
            <Route
                path="/"
                element={<Dashboard />}
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

        </Routes>
    );
}


export default AppRoutes;
import { Routes, Route, Navigate } from "react-router";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "../Pages/Home.jsx";

const UserRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<Navigate to="/home" />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
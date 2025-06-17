import { Routes, Route, Navigate } from "react-router";
import Login from "../Pages/Login.jsx"

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default PublicRoutes;
import { Routes, Route, Navigate } from "react-router";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../Pages/Admin/Dashboard.jsx"; // adjust path

const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoutes requireAdmin={true} />}>
                <Route path="/" element={<Navigate to="/admin" />} />
                <Route path="/admin" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/admin" />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
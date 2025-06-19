import { Routes, Route, Navigate } from "react-router";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import Dashboard from "@/Pages/Admin/Dashboard.jsx"; // adjust path
import AdminLayout from "@/Layouts/AdminLayout.jsx";
import Workflows from "@/Pages/Admin/Workflows.jsx";
import Users from "@/Pages/Admin/Users";


const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<AdminLayout/>}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workflow" element={<Workflows/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

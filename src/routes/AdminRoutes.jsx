import { Routes, Route, Navigate } from "react-router";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import Dashboard from "@/Pages/Admin/Dashboard.jsx"; // adjust path
import AdminLayout from "@/Layouts/AdminLayout.jsx";
import Workflows from "@/Pages/Admin/Workflows.jsx";


const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<AdminLayout/>}>
          <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/workflow" element={<Workflows/>}/>
          <Route path="*" element={<Navigate to="/admin" />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

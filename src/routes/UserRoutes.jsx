import { Routes, Route, Navigate } from "react-router";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import UserLayout from "@/Layouts/UserLayout";
import Layout from "@/Pages/User/Requests/Layout";
import Index from "@/Pages/User/Requests/Index";
import Create from "@/Pages/User/Requests/Create";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/requests" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="create" element={<Create />} />
          </Route>
          <Route path="*" element={<Navigate to="/requests" />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes;

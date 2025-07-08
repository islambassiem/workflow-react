import { Routes, Route, Navigate } from "react-router";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import UserLayout from "@/Layouts/UserLayout";
import Layout from "@/Pages/User/Requests/Layout";
import Index from "@/Pages/User/Requests/Index";
import Create from "@/Pages/User/Requests/Create";
import Steps from "@/Pages/User/Requests/Steps";
import {Layout as ApprovalLayout} from "@/Pages/Approval/Layout";
import {Index as ApprovalIndex} from "@/Pages/Approval/Index";
import {Steps as ApprovalSteps} from "@/Pages/Approval/Steps";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/requests" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="create" element={<Create />} />
            <Route path=":id/steps" element={<Steps />} />
          </Route>
          <Route path="/approvals/" element={<ApprovalLayout />}>
            <Route index element={<ApprovalIndex />} />
            <Route path="requests/:id/steps" element={<ApprovalSteps />} />
          </Route>
          <Route path="*" element={<Navigate to="/requests" />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes;

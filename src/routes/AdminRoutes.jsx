import { Routes, Route, Navigate } from "react-router";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import {Dashboard as DashboardIndex} from "@/Pages/Admin/Dashboard/Index.jsx";
import AdminLayout from "@/Layouts/AdminLayout.jsx";
import Workflows from "@/Pages/Admin/Workflows/Workflows.jsx";
import CreateWorkflow from "@/components/Workflow/CreateWorkflow";
import WorkflowSteps from "@/Pages/Admin/WorkflowSteps/WorkflowSteps";
import Layout from "@/Pages/Admin/Roles/Layout";
import Create from "@/Pages/Admin/Roles/Create";
import Index from "@/Pages/Admin/Roles/Index";
import { Index as UserIndex } from "@/Pages/Admin/Users/Index";
import Edit from "@/Pages/Admin/Roles/Edit";
import { Layout as UserLayout } from "@/Pages/Admin/Users/Layout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardIndex />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/workflows/create" element={<CreateWorkflow />} />
          <Route
            path="/workflows/:workflow/steps"
            element={<WorkflowSteps />}
          />
          <Route path="/roles" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="create" element={<Create />} />
            <Route path=":id/edit" element={<Edit />} />
          </Route>
          <Route path="/users" element={<UserLayout />}>
            <Route index element={<UserIndex />}></Route>
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

import { Routes, Route, Navigate } from "react-router";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import Dashboard from "@/Pages/Admin/Dashboard.jsx"; 
import AdminLayout from "@/Layouts/AdminLayout.jsx";
import Workflows from "@/Pages/Admin/Workflows.jsx";
import Users from "@/Pages/Admin/Users";
import CreateWorkflow from "@/components/Workflow/CreateWorkflow";
import WorkflowSteps from "@/Pages/Admin/WorkflowSteps";
import Roles from "@/Pages/Admin/Roles";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/workflows/create" element={<CreateWorkflow />} />
          <Route path="/workflows/:workflow/steps" element={<WorkflowSteps />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

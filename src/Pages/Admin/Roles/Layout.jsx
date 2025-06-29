import { useSetupContext } from "@/Context/SetupProvider";
import { Plus } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router";

const Layout = () => {
  const { t } = useSetupContext();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t("Roles Management")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {t("Manage system roles")}
              </p>
            </div>
            {location.pathname.includes("create") || (
                <button 
                  onClick={() => navigate("/roles/create")}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus size={20} />
                  {t("Add Role")}
                </button>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;

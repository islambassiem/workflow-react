import { useSetupContext } from "@/Context/SetupProvider";
import { Plus } from "lucide-react";
import { Outlet } from "react-router";

const Layout = () => {
    const {t} = useSetupContext();
    
  return (
    <>
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t("Requests Approvals")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {t(
                  "The Requests of the employees can be approved here"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export { Layout };

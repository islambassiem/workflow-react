import { useSetupContext } from "@/Context/SetupProvider";
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
                {t("Users Role Management")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {t("Grant the user their relevant roles")}
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

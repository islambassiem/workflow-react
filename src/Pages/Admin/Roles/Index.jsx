import { useState, useEffect } from "react";
import { useUserContext } from "@/Context/UserContext";
import { useSetupContext } from "@/Context/SetupProvider";
import { Eye } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";

const Index = () => {
  const { t } = useSetupContext();
  const { token } = useUserContext();
  const [links, setLinks] = useState({});
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  const fetchRoles = async (url = "/roles") => {
    setLoading(true);
    try {
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setRoles(res.data.data);
          setLinks(res.data.links);
          setMeta(res.data.meta);
        });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handlePageChange = (url) => {
    if (url) {
      fetchRoles(url);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left rtl:text-right font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("English")}
              </th>
              <th className="px-6 py-3 text-left rtl:text-right font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("Arabic")}
              </th>
              <th className="px-6 py-3 text-left rtl:text-right font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider max-w-md">
                {t("Permissions")}
              </th>
              <th className="px-6 py-3 text-left rtl:text-right font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("Created Date")}
              </th>
              <th className="px-6 py-3 text-center font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("Actions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {roles.map((role) => (
              <tr
                key={role.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {role.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-gray-100 font-fustat">
                    {role.name_ar}
                  </div>
                </td>
                <td className="px-6 py-4 w-xl">
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map((permission) => (
                      <span
                        key={permission.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                      >
                        {permission.name}
                      </span>
                    ))}
                    {role.permissions.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        +{role.permissions.length - 3} {t("more")}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(role.created_at).toDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => navigate("/roles/" + role.id + "/edit")}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 p-1 rounded"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {meta.last_page > 1 && (
          <Pagination
            links={links}
            meta={meta}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Index;

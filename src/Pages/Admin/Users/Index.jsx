import { useSetupContext } from "@/Context/SetupProvider";
import { useState } from "react";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";
import { useEffect } from "react";
import { Eye } from "lucide-react";
import Pagination from "@/components/ui/Pagination";
import { CiSearch } from "react-icons/ci";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import RolesModel from "@/components/Users/RolesModel";

const Index = () => {
  const { t, locale } = useSetupContext();
  const [users, setUsers] = useState([]);
  const { token } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [searchValue, setsearchValue] = useState("");
  const debouncedSearchValue = useDebouncedValue(searchValue, 500);
  const [showModal, setShowModel] = useState(false);
  const [userRoles, setUserRoles] = useState([]);

  const fetchUsers = async (url = `/users?search=${searchValue}`) => {
    setLoading(true);
    try {
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUsers(res.data);
        });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (debouncedSearchValue) {
        fetchUsers(`/users?search=${debouncedSearchValue}`);
      } else {
        fetchUsers();
      }
    }
    return () => {
      ignore = true;
    };
  }, [debouncedSearchValue]);

  const handlePageChange = (url) => {
    if (url) {
      fetchUsers(url + `&search=${searchValue}`);
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
      <div className="mb-6 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              id="search"
              type="text"
              placeholder={t("Search users...")}
              value={searchValue}
              onChange={(e) => setsearchValue(e.target.value)}
              className="bg-purple-400 dark:bg-purple-800 w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg "
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left rtl:text-right font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("Name")}
              </th>
              <th className="px-6 py-3 text-left rtl:text-right font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("Email")}
              </th>
              <th className="px-6 py-3 text-left rtl:text-right font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider max-w-md">
                {t("Roles")}
              </th>
              <th className="px-6 py-3 text-center font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("Actions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.data.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4 w-xl">
                  <div className="flex flex-wrap gap-1">
                    {user.roles.slice(0, 5).map((role) => (
                      <span
                        key={role.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                      >
                        {locale === "ar" ? role.name_ar : role.name}
                      </span>
                    ))}
                    {user.roles.length > 5 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        +{user.roles.length - 5} {t("more")}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setShowModel(true);
                        setUserRoles(user.roles)
                      }}
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
        {users.meta.last_page > 1 && (
          <Pagination
            className="bg-red-500"
            links={users.links}
            meta={users.meta}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
      {showModal && (
        <RolesModel
          setShowModel={setShowModel}
          userRoles={userRoles}
          setUserRoles={setUserRoles}
        />
      )}
    </div>
  );
};

export { Index };

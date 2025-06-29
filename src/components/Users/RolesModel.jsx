import { useSetupContext } from "@/Context/SetupProvider";
import { Label, Checkbox } from "flowbite-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useUserContext } from "@/Context/UserContext";

const RolesModel = ({
  setShowModel,
  selectedUser,
  setSelectedUser,
  handelRoleUpdate
}) => {
  const [roles, setRoles] = useState([]);
  const { locale, t} = useSetupContext();
  const { token } = useUserContext();
  const [loading, setLoading] = useState(true);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoles(res.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleRoleChange = (role, isCheckd) => {
    setSelectedUser({
      ...selectedUser,
      roles: isCheckd
        ? [...selectedUser.roles, role]
        : selectedUser.roles.filter((r) => r.id !== role.id),
    });
  };

  const handleSubmit = () => {
    handelRoleUpdate(selectedUser)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        setShowModel(false);
      }}
      className="fixed inset-0 bg-black/50 bg-opacity-50 dark:bg-black/60 dark:bg-opacity-70 flex items-center justify-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full"
      >
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {t("Roles")}
          </h3>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("You can add or remove roles for this user")}
            </div>
            <div className="grid grid-cols-12">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="flex items-center gap-2 col-span-6"
                >
                  <Checkbox
                    id={role.id}
                    name="role_id"
                    checked={selectedUser.roles.some((r) => r.id === role.id)}
                    onChange={(e) => handleRoleChange(role, e.target.checked)}
                  />
                  <Label htmlFor={role.id}>
                    {locale === "ar" ? role.name_ar : role.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModel(false)}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t("Cancel")}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("Save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesModel;

import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";
import { Label, Radio } from "flowbite-react";
import { useSetupContext } from "@/Context/SetupProvider";

const DataModal = ({
  editingStep,
  formData,
  setFormData,
  setShowCreateModal,
  handleSubmit,
}) => {
  const [roles, setRoles] = useState([]);
  const { token } = useUserContext();
  const { locale, t } = useSetupContext();

  async function getRoles() {
    const res = await axios.get(`/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRoles(res.data.data);
  }

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div
      onClick={() => {
        setShowCreateModal(false);
      }}
      className="fixed inset-0 bg-black/50 bg-opacity-50 dark:bg-black/60 dark:bg-opacity-70 flex items-center justify-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full"
      >
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {editingStep ? t("Edit Step") : t("Create New Step")}
          </h3>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t("Step Name")} *
            </Label>
            <input
              id="name"
              autoComplete="off"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={t("Enter step name")}
            />
          </div>

          <div>
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t("Step Description")} *
            </Label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={t("Describe what happens in this step")}
            />
          </div>

          <div>
            <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("Approver Role")} *
            </div>
            <div className="grid grid-cols-12">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="flex items-center gap-2 col-span-6"
                >
                  <Radio
                    id={role.id}
                    name="role_id"
                    checked={formData.role_id === role.id}
                    value={role.id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role_id: Number(e.target.value),
                      })
                    }
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
              onClick={() => setShowCreateModal(false)}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t("Cancel")}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingStep ? t("Update Step") : t("Create Step")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataModal;

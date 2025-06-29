import { useEffect, useState } from "react";
import axios from "axios";
import { useSetupContext } from "@/Context/SetupProvider";
import { Button, Checkbox, HelperText, Label, TextInput } from "flowbite-react";
import { useUserContext } from "@/Context/UserContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { IoIosSave } from "react-icons/io";

const Create = () => {
  const { token } = useUserContext();
  const { t, theme } = useSetupContext();
  const [formData, setFormData] = useState({
    name: "",
    name_ar: "",
    permissions: [],
  });
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPermissions = async () => {
      await axios
        .get("/permissions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPermissions(res.data.data);
        });
    };
    getPermissions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storeRole = async () => {
      await axios
        .post(
          "/roles",
          {
            name: formData.name,
            name_ar: formData.name_ar,
            permissions: formData.permissions,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          setFormData({
            name: "",
            name_ar: "",
            permissions: [],
          });
          Swal.fire({
            position: "top-end",
            icon: "success",
            theme: theme,
            toast: true,
            title: t("The role was added successfully"),
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/roles");
        });
    };
    storeRole();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 md:grid-cols-12 gap-4 w-full">
            <div className="md:col-span-6 sm:col-span-1">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="name"
                    color={formData.name === "" ? "failure" : "success"}
                  >
                    {t("Role Name in English") + " *"}
                  </Label>
                </div>
                <TextInput
                  id="name"
                  autoComplete="off"
                  placeholder={t("Role Name in English")}
                  color={formData.name === "" ? "failure" : "success"}
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="md:col-span-6 sm:col-span-1">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="name_ar"
                    color={formData.name_ar === "" ? "failure" : "success"}
                  >
                    {t("Role Name in Arabic") + " *"}
                  </Label>
                </div>
                <TextInput
                  id="name_ar"
                  placeholder={t("Role Name in Arabic")}
                  color={formData.name_ar === "" ? "failure" : "success"}
                  type="text"
                  value={formData.name_ar}
                  onChange={(e) => {
                    setFormData({ ...formData, name_ar: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <h2 className="mt-6 mb-3 text-2xl">{t("Permissions")}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-12 gap-4 w-full mt-6 overflow-y-auto h-72 px-3">
            {permissions.map((permission) => (
              <div
                className="flex items-center mb-4 md:col-span-3 sm:col-span-1"
                key={permission.id}
              >
                <Checkbox
                  id={permission.id}
                  type="checkbox"
                  value={permission.id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        permissions: [...formData.permissions, permission.id],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        permissions: formData.permissions.filter(
                          (id) => id !== permission.id
                        ),
                      });
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={permission.id}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {permission.name}
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Button type="submit" className="flex gap-2">
              <IoIosSave />
              {t("Save")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;

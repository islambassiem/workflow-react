import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";
import { useSetupContext } from "@/Context/SetupProvider";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { MdEditSquare } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import Swal from "sweetalert2";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Edit = () => {
  const { id } = useParams();
  const [role, setRole] = useState({ permissions: [] });
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useUserContext();
  const { t, theme } = useSetupContext();
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (role.name.length === 0) {
      return;
    }
    if (role.name_ar.length === 0) {
      return;
    }
    const updateRole = async () => {
      const permissionsIds = role.permissions.map((p) => p.id);

      await axios
        .put(
          `/roles/${id}`,
          { permissions: permissionsIds },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            theme: theme,
            toast: true,
            title: t("The role was updated successfully"),
            showConfirmButton: false,
            timer: 1500,
          });
        });
    };

    updateRole();
    setEditing(false);
  }

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch both permissions and role data in parallel
      const [permissionsResponse, roleResponse] = await Promise.all([
        axios.get("permissions", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`/roles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setPermissions(permissionsResponse.data.data);
      setRole(roleResponse.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: t("Are you sure?"),
      text: t("You won't be able to revert this!"),
      icon: "warning",
      theme: theme,
      showCancelButton: true,
      cancelButtonText: t("Cancel"),
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Yes, delete it!"),
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`/roles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          theme: theme,
          toast: true,
          title: t("The role was deleted successfully"),
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/roles");
      } catch (error) {
        console.log(error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
    }
  };

  const handlePermissionChange = (permissionId, isChecked) => {
    setRole((prevRole) => {
      const currentPermissions = prevRole.permissions || [];

      if (isChecked) {
        // Add permission if not already present
        const permissionExists = currentPermissions.some(
          (p) => p.id === permissionId
        );
        if (!permissionExists) {
          const permission = permissions.find((p) => p.id === permissionId);
          return {
            ...prevRole,
            permissions: [...currentPermissions, permission],
          };
        }
      } else {
        // Remove permission
        return {
          ...prevRole,
          permissions: currentPermissions.filter((p) => p.id !== permissionId),
        };
      }

      return prevRole;
    });
  };

  const isPermissionChecked = (permissionId) => {
    return role.permissions?.some((p) => p.id === permissionId) || false;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 md:grid-cols-12 gap-4 w-full">
            <div className="md:col-span-6 sm:col-span-1">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name">
                    {t("Role Name in English") + " *"}
                  </Label>
                </div>
                <TextInput
                  disabled
                  id="name"
                  autoComplete="off"
                  value={role.name}
                />
              </div>
              {role.name.length === 0 && (
                <p className="text-red-500 text-sm">{t("Name is required")}</p>
              )}
            </div>
            <div className="md:col-span-6 sm:col-span-1">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name_ar">
                    {t("Role Name in Arabic") + " *"}
                  </Label>
                </div>
                <TextInput disabled id="name_ar" value={role.name_ar} />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-12 gap-4 w-full mt-6">
            <div className="md:col-span-6 sm:col-span-1">
              <Label htmlFor="created_at">{t("Created At")}</Label>
              <TextInput
                disabled
                type="text"
                id="created_at"
                value={new Date(role.created_at).toLocaleString()}
              />
            </div>
            {role.created_at && (
              <div className="md:col-span-6 sm:col-span-1">
                <div className="md:col-span-6 sm:col-span-1">
                  <Label htmlFor="updated_at">{t("Updated At")}</Label>
                  <TextInput
                    disabled
                    type="text"
                    id="updated_at"
                    value={new Date(role.updated_at).toLocaleString()}
                  />
                </div>
              </div>
            )}
          </div>
          <h2
            className={`mt-6 mb-3 text-2xl ${!editing ? "text-gray-400" : ""}`}
          >
            {t("Permissions")}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-12 gap-4 w-full mt-6 overflow-y-auto h-72 px-3">
            {permissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-center mb-4 md:col-span-3 sm:col-span-1"
              >
                <Label htmlFor={permission.id} disabled={!editing}>
                  <Checkbox
                    disabled={!editing}
                    type="checkbox"
                    id={permission.id}
                    checked={isPermissionChecked(permission.id)}
                    onChange={(e) =>
                      handlePermissionChange(permission.id, e.target.checked)
                    }
                  />
                  <span className="ms-4">{permission.name}</span>
                </Label>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            {editing || (
              <div className="flex gap-2">
                <Button
                  type="button"
                  className="flex gap-2"
                  onClick={() => setEditing(true)}
                >
                  <MdEditSquare />
                  {t("Edit")}
                </Button>
                <Button
                  color="red"
                  type="button"
                  className="flex gap-2"
                  onClick={() => handleDelete(id)}
                >
                  <RiDeleteBin6Fill />
                  {t("Delete")}
                </Button>
              </div>
            )}
            {editing && (
              <Button type="submit" className="flex gap-2">
                <IoIosSave />
                {t("Save")}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;

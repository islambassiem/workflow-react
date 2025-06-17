import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useUserContext } from "@/Context/UserContext.jsx";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { useSetupContext } from "../Context/SetupProvider";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { CiSun } from "react-icons/ci";
import { BsMoonStars } from "react-icons/bs";
import { NavLink } from "react-router";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setUser, token, setToken } = useUserContext();
  const navigate = useNavigate();
  const { theme, handleTheme, locale, handleLocale, handleDir, t } =
    useSetupContext();

  const navItems = [
    {
      name: "Workflows",
      route: "/workflow",
      icon: "Icon",
    },
    {
      name: "Admin",
      route: "/admin",
      icon: "AdminIcon",
    },
  ];

  async function logout(e) {
    e.preventDefault();

    await axios
      .post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        navigate("/");
      });
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:inset-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">My Dashboard</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((link) => (
            <NavLink
              key={link.name}
              to={link.route}
              className={({isActive}) =>
                `block px-4 py-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-green-200" : "bg-blue-500"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile top navbar */}
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-700">Dashboard</h1>
        </header>

        {/* Content area */}
        <main className="flex-1 p-4 overflow-y-auto">
          {/* 👇 Main content header */}
          <div className="mb-6 border-b pb-3 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Page Title</h2>
            <form>
              <button
                onClick={logout}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {t("Logout")}
              </button>
            </form>
            <div className="flex items-center gap-2">
              <Tooltip
                arrow
                title={theme === "light" ? t("Dark Mode") : t("Light Mode")}
              >
                <IconButton
                  onClick={() => {
                    handleTheme();
                  }}
                >
                  {theme === "dark" ? (
                    <CiSun className="text-black dark:text-white text-3xl" />
                  ) : (
                    <BsMoonStars className="text-black text-2xl" />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip arrow title={locale === "ar" ? "إنجليزي" : "Arabic"}>
                <IconButton
                  onClick={() => {
                    handleLocale();
                    handleDir();
                  }}
                >
                  {locale === "en" ? (
                    <span className="fi fi-sa"></span>
                  ) : (
                    <span className="fi fi-us"></span>
                  )}
                </IconButton>
              </Tooltip>
            </div>
          </div>

          {/* Page content passed as children */}
          {children}
          <Outlet/>
        </main>
      </div>
    </div>
  );
}

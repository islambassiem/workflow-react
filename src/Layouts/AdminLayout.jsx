import { useState } from "react";
import { useSetupContext } from "@/Context/SetupProvider.jsx";
import {
  Menu,
  X,
  Home,
  BarChart3,
  Users,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
  UserCog
} from "lucide-react";
import { NavLink, Outlet } from "react-router";
import useLogout from "@/hooks/useLogout.js";
import { t } from "i18next";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const logout = useLogout();
  const { theme, handleTheme, locale, handleLocale, handleDir } =
    useSetupContext();

  const navigationItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "Roles", icon: UserCog, href: "/roles"},
    { name: "Users", icon: Users, href: "/users" },
    { name: "Workflows", icon: BarChart3, href: "/workflows" },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleDarkMode = () => handleTheme();
  const handleLogout = () => logout();
  const toggleLocale = () => {
    handleLocale();
    handleDir();
  };

  return (
    <div className={`min-h-screen`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 relative">
        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`
          ${
            mobileMenuOpen
              ? "translate-x-0 "
              : "-translate-x-full rtl:translate-x-full"
          } 
          md:translate-x-0 md:rtl:translate-x-0
          ${sidebarOpen ? "md:w-64" : "md:w-16"} 
          fixed md:relative 
          w-64 
          h-full 
          z-50 
          transition-all duration-300 ease-in-out 
          bg-white dark:bg-gray-800 
          shadow-lg 
          border-r border-gray-200 dark:border-gray-700 
          flex flex-col
        `}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div
              className={`${
                sidebarOpen ? "block" : "hidden"
              } transition-all duration-300`}
            >
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t("WMS - INY")}
              </h1>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
            {/* Desktop toggle button */}
            <button
              onClick={toggleSidebar}
              className="hidden md:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({
                  isActive,
                }) => `w-full flex items-center rounded-lg transition-all duration-200 group
              ${sidebarOpen ? "px-3 py-3" : "px-2 md:py-3 md:justify-center"}
              ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }
              `}
                onClick={() => {
                  setCurrentPage(item.name);
                  setMobileMenuOpen(false); // Close mobile menu when item is selected
                }}
              >
                <div className="flex w-full">
                  <item.icon size={15} className="flex-shrink-0" />
                  {(sidebarOpen || window.innerWidth >= 768) && (
                    <>
                      <span
                        className={`ms-3 text-sm font-medium ${
                          sidebarOpen || window.innerWidth <= 768
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        {t(item.name)}
                      </span>
                      {currentPage === item.name && (
                        <ChevronRight
                          size={16}
                          className="ms-auto rtl:rotate-180"
                        />
                      )}
                    </>
                  )}
                  {!sidebarOpen && window.innerWidth >= 768 && (
                    <div className="absolute left-16 ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      {item.name}
                    </div>
                  )}
                </div>
              </NavLink>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div
              className={`flex items-center ${
                sidebarOpen
                  ? "px-4 py-2"
                  : "md:justify-center md:py-2 px-4 py-2"
              }`}
            >
              {(sidebarOpen || window.innerWidth >= 768) && (
                <div
                  className={`flex w-full justify-around ${
                    sidebarOpen || window.innerWidth <= 768
                      ? "flex-row"
                      : "flex-col"
                  }`}
                >
                  {/* Language Selector */}
                  <button
                    onClick={toggleLocale}
                    className={`flex items-center space-x-2 ${
                      sidebarOpen || window.innerWidth <= 768
                        ? "px-4 py-2"
                        : "p-2"
                    } rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors`}
                  >
                    {/* <Globe size={18} /> */}
                    {locale === "en" ? (
                      <span className="fi fi-sa text-2xl"></span>
                    ) : (
                      <span className="fi fi-us text-2xl"></span>
                    )}{" "}
                  </button>

                  {/* Dark Mode Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className={`${
                      sidebarOpen || window.innerWidth <= 768
                        ? "px-4 py-2"
                        : "p-2"
                    } flex justify-center items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors`}
                  >
                    {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className={`flex justify-center items-center ${
                      sidebarOpen || window.innerWidth <= 768
                        ? "px-4 py-2"
                        : "p-2"
                    } bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors`}
                  >
                    <LogOut size={18} className="rtl:rotate-180" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toggle side menu */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden ms-4 mt-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          >
            <Menu size={20} />
          </button>
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
            {/* Main Dashboard Content */}
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

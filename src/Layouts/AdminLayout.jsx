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
  SquareUserRound,
} from "lucide-react";
import { Link, Outlet } from "react-router";
import useLogout from "@/hooks/useLogout.js";

const Dashboard = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const logout = useLogout();
  const { theme, handleTheme, locale, handleLocale, handleDir } =
    useSetupContext();

  const navigationItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "Workflows", icon: BarChart3, href: "/workflows" },
    { name: "Users", icon: Users, href: "/users" },
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
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 
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
                Dashboard
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
              <Link key={item.name} to={item.href}>
                <button
                  onClick={() => {
                    setCurrentPage(item.name);
                    setMobileMenuOpen(false); // Close mobile menu when item is selected
                  }}
                  className={`w-full flex items-center ${
                    sidebarOpen
                      ? "px-4 py-3"
                      : "md:px-3 md:py-3 md:justify-center px-4 py-3"
                  } rounded-lg transition-all duration-200 group ${
                    currentPage === item.name
                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {(sidebarOpen || window.innerWidth >= 768) && (
                    <>
                      <span
                        className={`ms-3 text-sm font-medium ${
                          sidebarOpen || window.innerWidth <= 768
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        {item.name}
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
                </button>
              </Link>
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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                <SquareUserRound />
              </div>
              {(sidebarOpen || window.innerWidth >= 768) && (
                <div
                  className={`ms-3 ${
                    sidebarOpen || window.innerWidth <= 768 ? "block" : "hidden"
                  }`}
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Administrator
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Page Title */}
              <div className="flex items-center">
                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMobileMenu}
                  className="md:hidden mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                >
                  <Menu size={20} />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentPage}
                </h2>
                {/* <div className="ml-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="hidden sm:block">Welcome back, John!</span>
                </div> */}
              </div>

              {/* Header Actions */}
              <div className="flex items-center space-x-1">
                {/* Notifications
                <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button> */}

                {/* Language Selector */}
                <button
                  onClick={toggleLocale}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                >
                  {/* <Globe size={18} /> */}
                  {locale === "en" ? (
                    <span className="fi fi-sa text-2xl"></span>
                  ) : (
                    <span className="fi fi-us text-2xl"></span>
                  )}{" "}
                  {/* <span className="text-sm font-medium">EN</span> */}
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                >
                  {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                >
                  <LogOut size={18} className="rtl:rotate-180" />
                  {/* <span className="text-sm font-medium">Logout</span> */}
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
            {/* Main Dashboard Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="py-3">
                <section className="text-gray-600 dark:text-gray-400">
                  {children}
                  <Outlet />
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

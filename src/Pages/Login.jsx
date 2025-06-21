import { CiSun } from "react-icons/ci";
import { BsMoonStars } from "react-icons/bs";
import "flag-icons/css/flag-icons.min.css";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useSetupContext } from "@/Context/SetupProvider.jsx";
import { useState } from "react";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext.jsx";
import { useNavigate } from "react-router";

const Login = () => {
  const { theme, handleTheme, locale, handleLocale, handleDir, t } =
    useSetupContext();
  const { setToken } = useUserContext();
  const [formData, setFormData] = useState({
    email: "admin@example.com",
    password: "password",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setErrors(null);
    axios
      .post("/login", formData)
      .then((res) => {
        setToken(res.data.data.token);
        localStorage.setItem("token", res.data.data.token);
        const user = res.data.data.user;
        if (user) {
          user.roles.includes("admin") ? navigate("/admin") : navigate("/home");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          setErrors("Network Error");
        } else {
          setErrors(err.response.data.errors); 
        }
      });
  }

  return (
    <section className="flex flex-col h-screen">
      <header
        className={`shadow-2xl px-8 h-1/12  flex items-center justify-between`}
      >
        <div className="text-2xl">{locale === "en" ? "logo" : "لوجو"}</div>
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
      </header>

      <main className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/login-image.jpg"
            alt="Background"
            className="w-full h-full object-cover blur-xs brightness-95 dark:contrast-[.25]"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
              {t("Login to Your Account")}
              <br/>
              {errors && (
              <p className="text-red-500 font-medium mt-5">{t("Network Error")}</p>
            )}
            </h2>{" "}
            <form
              onSubmit={handleFormSubmit}
              method="POST"
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  {t("Email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors && errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email[0]}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  {t("Password")}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  {t("Sign In")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};
export default Login;

import { useTranslation } from "react-i18next";
import { useUserContext } from "@/Context/UserContext.jsx";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Layout({ children }) {
  const { t } = useTranslation();
  const { user, setUser, token, setToken } = useUserContext();
  const navigate = useNavigate();

  async function logout(e) {
    e.preventDefault();

    await axios.post("/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/");
    })
  }


  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4 flex justify-between">
        <h1 className="text-xl">{user.data.name}</h1>
        <form onSubmit={logout}>
          <button>Logout</button>
        </form>
      </header>
      <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © {new Date().getFullYear()} {t("Inaya Medical Colleges")}
      </footer>
    </div>
  );
}

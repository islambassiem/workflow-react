import { useUserContext } from "@/Context/UserContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router";


export default function useLogout() {

  const { token, setUser, setToken } = useUserContext();
  const navigate = useNavigate();

  const logout = async (e) => {
    e?.preventDefault();

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
  };

  return logout;
}

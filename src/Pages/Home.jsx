
import {useUserContext} from "@/Context/UserContext.jsx";



import axios from "axios";
import {useNavigate} from "react-router";

const Home = () => {
    const {user, token, setUser, setToken} = useUserContext();

    const navigate = useNavigate();
    async function logout(e) {
        e.preventDefault();

        await axios.post("/logout", {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            navigate("/");
        })
    }
    return (
        <div>
            Name: {user?.data.name} <br/>
            Email: {user?.data.email}
            <form onSubmit={logout}>
                <button>Logout</button>
            </form>
        </div>
    )
}
export default Home

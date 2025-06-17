import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    async function getUser() {
        try {
            const response = await axios.get("/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
            setIsAdmin(response.data?.data.roles.includes('admin') || false);
        } catch (error){
            console.error("Error fetching user", error);
            setUser(null);
            setIsAdmin(false);
            setToken(null);
            localStorage.removeItem("token");
        }

    }

    useEffect(() => {
        if (token) {
            getUser().finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                isAdmin,
                loading
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(UserContext);

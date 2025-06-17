
import {useUserContext} from "@/Context/UserContext.jsx";
import {Navigate, Outlet} from "react-router";

const ProtectedRoutes = () => {
    
    const {user} = useUserContext()
    return (
        user ? <Outlet/> : <Navigate to="/login"/>
    )
}
export default ProtectedRoutes

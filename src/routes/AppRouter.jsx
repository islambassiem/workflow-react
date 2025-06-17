import {useUserContext} from "../Context/UserContext.jsx"; // adjust path
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const AppRouter = () => {
    const {token, isAdmin, loading} = useUserContext();

    if (loading) return <div>Loading...</div>;

    return (
        <>
            {!token && <PublicRoutes/>}

            {!isAdmin ? <UserRoutes/> : <AdminRoutes/> }
        </>
    );
};

export default AppRouter;

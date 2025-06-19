import {useUserContext} from "@/Context/UserContext.jsx"; // adjust path
import PublicRoutes from "@/routes/PublicRoutes";
import AdminRoutes from "@/routes/AdminRoutes";
import UserRoutes from "@/routes/UserRoutes";

const AppRouter = () => {
    const {token, isAdmin, loading} = useUserContext();

    if (loading) return <div>Loading...</div>;

    return (
        <>
            {token ? isAdmin ? <AdminRoutes/> : <UserRoutes/> : <PublicRoutes/>}
        </>
    );
};

export default AppRouter;


import {useUserContext} from "../../Context/UserContext.jsx";
import AdminLayout from "../../Layouts/AdminLayout.jsx";
export default function Dashboard(){
    const {user} = useUserContext();
    return (
        <>
            <h1>{user.data.name}</h1>
        </>
    );
}
import Layout from "./Layout";
import {useUserContext} from "../../Context/UserContext.jsx";
export default function Dashboard(){
    const {user} = useUserContext();
    return (
        <>
        <Layout>
            <h1>{user.name}</h1>
        </Layout>
        </>
    );
}
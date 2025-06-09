import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./Pages/Login.jsx";

function App() {

    console.log('app rendered');

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    {/*<Route path="/login" element={<Login/>}/>*/}
                </Routes>
            </BrowserRouter>
        </>

    )
}


export default App

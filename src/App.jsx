import {BrowserRouter, Routes, Route, Navigate} from "react-router";
import AppRouter from "@/routes/AppRouter.jsx";

function App() {
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;

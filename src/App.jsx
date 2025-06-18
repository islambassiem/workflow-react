import {BrowserRouter, Routes, Route, Navigate} from "react-router";
import AppRouter from "@/routes/AppRouter.jsx";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-dark-purple/theme.css";

function App({ pageProps }) {
    return (
        <PrimeReactProvider>
            <BrowserRouter>
                <AppRouter {...pageProps}/>
            </BrowserRouter>
        </PrimeReactProvider>
    );
}

export default App;

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import './fonts.css'
import App from './App.jsx'
import './i18n';
import {SetupProvider} from "./Context/SetupProvider.jsx";
import {UserProvider} from "@/Context/UserContext.jsx";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept-Language"] = localStorage.getItem("locale") || "en";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SetupProvider>
            <UserProvider>
                <App/>
            </UserProvider>
        </SetupProvider>
    </StrictMode>
)

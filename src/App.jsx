import {useStateContext} from "./Context/SetupProvider.jsx";
import {BrowserRouter, Route, Routes} from "react-router";

function App() {
    const {theme, handleTheme, dir, handleDir, locale, handleLocale, t} = useStateContext();

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<div>App</div>}/>
                </Routes>
            </BrowserRouter>

        </>

    )
}


export default App

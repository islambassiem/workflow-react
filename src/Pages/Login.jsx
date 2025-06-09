import {CiSun} from "react-icons/ci";
import {BsMoonStars} from "react-icons/bs";
import "flag-icons/css/flag-icons.min.css";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {useStateContext} from "../Context/SetupProvider.jsx";

const Login = () => {
    const {theme, handleTheme, locale, handleLocale, handleDir, t} = useStateContext();
    console.log(theme);
    return (
        <>
            <header
                className="shadow-2xl px-25 h-20 bg-primary-light dark:bg-primary-dark text-white flex items-center justify-between ">
                <div className="text-2xl">
                    {locale === 'en' ? 'logo': 'لوجو'}
                </div>
                <div className="flex items-center gap-2">
                    <Tooltip arrow title={theme === 'light' ? t('Dark Mode') : t('Light Mode')}>
                        <IconButton onClick={() => {handleTheme()}}>
                            {theme === 'dark'
                                ? <CiSun className="text-white text-3xl"/>
                                : <BsMoonStars className="text-white text-2xl"/>}
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow title={locale === 'ar' ? 'إنجليزي' : 'Arabic'}>
                        <IconButton onClick={() => {handleLocale(); handleDir()}}>
                            {locale === 'en'
                                ? <span className="fi fi-sa"></span>
                                : <span className="fi fi-us"></span>
                            }
                        </IconButton>
                    </Tooltip>
                </div>
            </header>
        </>
    )
}
export default Login

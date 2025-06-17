import {createContext, useContext, useEffect} from "react";
import {useTranslation} from 'react-i18next';
import useLocalStorage from "@/hooks/useLocalStorage.js";


const SetupContext = createContext(null);

export const SetupProvider = ({children}) => {
    const { t, i18n } = useTranslation();
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    const [dir, setDir] = useLocalStorage('dir', 'ltr');
    const [locale, setLocale] = useLocalStorage('locale', 'en');

    const root = document.getElementById('root');

    useEffect(() => {
        if (theme === 'dark') {
            root.classList.add('dark', 'dark:bg-slate-900', 'dark:text-white');
        } else {
            root.classList.remove('dark', 'dark:bg-slate-900', 'dark:text-white');
        }
    }, [theme]);

    useEffect(() => {
        root.setAttribute('dir', dir);
        if (dir === 'rtl') {
            root.classList.remove('font-serif');
            root.classList.add('font-fustat');
            root.classList.add('font-bold');
        } else {
            root.classList.remove('font-fustat');
            root.classList.remove('font-bold');
            root.classList.add('font-serif');
        }
    }, [dir]);

    useEffect(() => {
        i18n.changeLanguage(locale);
    }, [i18n, locale]);

    const handleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    const handleDir = () => {
        const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
        setDir(newDir);
        localStorage.setItem('dir', newDir);
    }

    const handleLocale = () => {
        const newLocale = locale === 'en' ? 'ar' : 'en';
        setLocale(newLocale);
        localStorage.setItem('locale', newLocale);
    }

    return (
        <SetupContext.Provider value={{
            theme, handleTheme,
            dir, handleDir,
            locale, handleLocale,
            t,
        }}>
            {children}
        </SetupContext.Provider>
    );
}


// eslint-disable-next-line react-refresh/only-export-components
export const useSetupContext = () => useContext(SetupContext);

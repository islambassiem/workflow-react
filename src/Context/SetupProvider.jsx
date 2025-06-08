import {createContext, useContext, useState, useEffect} from "react";
import {useTranslation} from 'react-i18next';


const SetupContext = createContext(null);

export const SetupProvider = ({children}) => {
    const { t, i18n } = useTranslation();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [dir, setDir] = useState(localStorage.getItem('dir') || 'ltr');
    const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en');

    const root = document.getElementById('root');

    useEffect(() => {
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', 'light');
        }
        root.classList.toggle('dark');
        root.classList.toggle('dark:bg-slate-900');
        root.classList.toggle('dark:text-white');
    }, [root.classList, theme]);

    useEffect(() => {
        if (!localStorage.getItem('dir')) {
            localStorage.setItem('dir', 'lrt');
        }
        root.setAttribute('dir', dir);
        root.classList.toggle('font-Alexandria');
        root.classList.toggle('font-medium');
    }, [dir, root]);

    useEffect(() => {
        if (!localStorage.getItem('locale')) {
            localStorage.setItem('locale', 'en');
        }
        i18n.changeLanguage(locale).then(r => {});
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
export const useStateContext = () => useContext(SetupContext);

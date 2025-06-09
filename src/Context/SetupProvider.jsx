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
        if (theme === 'dark') {
            root.classList.add('dark', 'dark:bg-slate-900', 'dark:text-white');
        } else {
            root.classList.remove('dark', 'dark:bg-slate-900', 'dark:text-white');
        }
    }, [theme]);

    useEffect(() => {
        if (!localStorage.getItem('dir')) {
            localStorage.setItem('dir', 'ltr');
        }
        root.setAttribute('dir', dir);
        if (dir === 'rtl') {
            root.classList.add('font-Alexandria');
            root.classList.add('font-medium');
        } else {
            root.classList.remove('font-Alexandria');
            root.classList.remove('font-medium');
        }
    }, [dir, root]);

    useEffect(() => {
        if (!localStorage.getItem('locale')) {
            localStorage.setItem('locale', 'en');
        }
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
export const useStateContext = () => useContext(SetupContext);

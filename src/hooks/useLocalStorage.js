import {useEffect, useState} from 'react'

function getSavedValue(key, initialValue) {
    const savedValue = localStorage.getItem(key);
    if (savedValue) return savedValue;
    if (initialValue instanceof Function) return initialValue();
    return initialValue;
}

const UseLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });

    useEffect(() => {
        localStorage.setItem(key, value);
    }, [value]);

    return [value, setValue];
}
export default UseLocalStorage

'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DarkMode() {
    let router = useRouter();
    let [mode, setMode] = useState('light');

    useEffect(() => {
        let cookieValue = ('; ' + document.cookie).split(`; mode=`).pop().split(';')[0];
        if (cookieValue === '') {
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400);
            setMode('light');
        } else {
            setMode(cookieValue);
        }
    }, []);

    const toggleMode = () => {
        let newMode = mode === 'light' ? 'dark' : 'light';
        document.cookie = `mode=${newMode}; max-age=` + (3600 * 24 * 400);
        setMode(newMode);
        router.refresh();
    };

    return (
        <span style={{cursor : "pointer"}} onClick={toggleMode}>
            {mode === 'light' ? '🌙' : '☀️'}
        </span>
    );
}

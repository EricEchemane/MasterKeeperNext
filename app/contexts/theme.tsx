import CssBaseline from '@mui/material/CssBaseline';
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';

const getTheme = (theme: 'light' | 'dark') => createTheme({
    palette: {
        mode: theme,
    },
});

const ThemeContext = createContext<any>(null);

export function ThemeContextProvider(props: {
    children: JSX.Element;
    colorScheme?: 'light' | 'dark';
    pageProps?: {
        session: any;
    };
}) {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const toggleTheme = () => {
        setTheme(t => {
            const newTheme = t === 'dark' ? 'light' : 'dark';
            localStorage.setItem('master-keeper-theme', newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        const t: any = localStorage.getItem('master-keeper-theme') || 'dark';
        setTheme(t);
    }, []);

    return <>
        <ThemeContext.Provider value={{
            theme: theme,
            toggleTheme
        }}>
            <ThemeProvider theme={getTheme(theme)}>
                <CssBaseline />
                <SessionProvider session={props.pageProps?.session}>
                    {props.children}
                </SessionProvider>
            </ThemeProvider>
        </ThemeContext.Provider>
    </>;
}

const useThemeContext = () => useContext<{
    theme: string;
    toggleTheme: () => {};
}>(ThemeContext);

export default useThemeContext;
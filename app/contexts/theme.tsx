import CssBaseline from '@mui/material/CssBaseline';
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { setCookie } from 'cookies-next';

const getTheme = (theme: 'light' | 'dark') => createTheme({
    palette: {
        mode: theme,
    },
});

const ThemeContext = createContext<any>(null);

export type themeType = 'light' | 'dark';

export function ThemeContextProvider(props: {
    children: JSX.Element;
    theme: themeType;
    pageProps?: {
        session: any;
    };
}) {
    const [theme, setTheme] = useState<'light' | 'dark'>(props.theme);
    const toggleTheme = () => {
        setTheme(t => {
            const newTheme = t === 'dark' ? 'light' : 'dark';
            setCookie('master-keeper-theme', newTheme);
            return newTheme;
        });
    };

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
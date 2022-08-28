import { createContext, useContext, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { setCookie } from 'cookies-next';

const getTheme = (theme: 'light' | 'dark') => createTheme({
    palette: {
        mode: theme,
    },
});

const ThemeContext = createContext<any>(null);

export function ThemeContextProvider(props: {
    children: JSX.Element;
    colorScheme: 'light' | 'dark';
}) {
    const [theme, setTheme] = useState<'light' | 'dark'>(props.colorScheme);
    const toggleTheme = () => {
        setTheme(t => {
            const newTheme = t === 'dark' ? 'light' : 'dark';
            setCookie('master-keeper-theme', newTheme, { maxAge: 60 * 60 * 24 * 30 });
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
                {props.children}
            </ThemeProvider>
        </ThemeContext.Provider>
    </>;
}

const useThemeContext = () => useContext<{
    theme: string;
    toggleTheme: () => {};
}>(ThemeContext);

export default useThemeContext;
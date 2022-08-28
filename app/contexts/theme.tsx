import { createContext, useContext, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const getTheme = (theme: 'light' | 'dark') => createTheme({
    palette: {
        mode: theme,
    },
});

const ThemeContext = createContext<any>(null);

export function ThemeContextProvider(props: { children: JSX.Element; }) {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const toggleTheme = () => {
        setTheme(t => t === 'dark' ? 'light' : 'dark');
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
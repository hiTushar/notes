import { createContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = (props) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <div>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                {props.children}
            </ThemeContext.Provider>
        </div>
    )
}

export { ThemeContext, ThemeProvider };

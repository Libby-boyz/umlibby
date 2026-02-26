import { createTheme } from "@mui/material";


export const theme = createTheme({
    cssVariables: true,
        palette: {
            mode: "light",
            primary: {
                main: "#004BAD",
                light: "#3A78C7",
                dark: "#00337A",
                contrastText: "#FFFFFF",
            },
            secondary: {
                main: "#FF751F",
                light: "#FF9A57",
                dark: "#CC5E18",
                contrastText: "#FFFFFF",
            },
            success: {
                main: "#C3ECB2",
                light: "#DCF5D2",
                dark: "#8FCF78",
                contrastText: "#1B5E20",
            },
            background: {
                default: "#F7F7F6",
                paper: "#FFFFFF",
            },
            text: {
                primary: "#1A1A1A",
                secondary: "#4A4A4A",
            },
            divider: "#E0E0E0",
        },
    shape: {
        // borderRadius: 10,
    },
    typography: {
        htmlFontSize: 10,
        fontFamily: "Roboto, Arial, sans-serif",
        h1: {
            fontSize: "3rem",
        },
        h2: {
            fontSize: "2.7rem",
        },
        h3: {
            fontSize: "2.5rem",
        },
        body1: {
            fontSize: "1.4rem",
        },
        body2: {
            fontSize: "1.2rem",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: ({palette}) => {
                return `
                   html {
                      font-size: 62.5%;
                   }
                   *::-webkit-scrollbar {
                      height: 8px;
                      width: 8px;
                   }
                   *::-webkit-scrollbar-track {
                      border-radius: 4px;
                      background-color: ${palette.secondary.main};
                   }
                    *::-webkit-scrollbar-track:hover {
                      background-color: ${palette.secondary.dark};
                    }
                    *::-webkit-scrollbar-track:active {
                      background-color: ${palette.secondary.dark};
                    }
                `;
            }
        },
        MuiButton: {
            styleOverrides: {
            },
            defaultProps: {
                variant: "contained",
                disableElevation: true,
            },
        },
        MuiStack: {
            defaultProps: {
                gap: 2,
            },
        },
    }
});
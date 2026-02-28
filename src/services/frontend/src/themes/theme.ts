import { createTheme } from "@mui/material";


export const theme = createTheme({
    cssVariables: true,
    palette: {
        mode: "light",
        primary: {
            main: "#3F5F4B",
            light: "#5F7F6B",
            dark: "#2E4637",
            contrastText: "#F4F1EA",
            // main: "#004BAD",
            // light: "#3A78C7",
            // dark: "#00337A",
            // contrastText: "#FFFFFF",
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
            default: "#F4F1EA",
            paper: "#F9F7F3",
        },
        text: {
            primary: "#1A1A1A",
            secondary: "#4A4A4A",
        },
        divider: "#E0E0E0",
    },
    typography: {
        fontFamily: "Raleway, Arial, sans-serif",
        // h1: {
        //     fontSize: "2rem",
        // },
        // h2: {
        //     fontSize: "1.8rem",
        // },
        // h3: {
        //     fontSize: "1.6rem",
        // },
        // h4: {
        //     fontSize: "1.4rem",
        // },
        // h5: {
        //     fontSize: "1.2rem",
        // },
        // h6: {
        //     fontSize: "1rem",
        // },
        // body1: {
        //     fontSize: "0.8rem",
        // },
        // body2: {
        //     fontSize: "0.6rem",
        // },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: ({ palette }) => {
                // return `
                //     html {
                //         scrollbarGutter: "stable",
                //     }
                //     * {
                //         scrollbarWidth: "thin",
                //         scrollbarColor: "#C7C7C7 transparent"
                //     }
                    // *::-webkit-scrollbar {
                    //     height: 8;
                    //     width: 2;
                    //     color: #BBBBBB;
                    // }
                //     *::-webkit-scrollbar-track {
                //         border-radius: 0px;
                //         background: transparent;
                //         color: #BBBBBB;
                //     }
                    // *::-webkit-scrollbar-thumb {
                    // backgroundColor: "#C7C7C7",
                    //     borderRadius: 8,
                    //     border: "2px solid transparent",
                    //     backgroundClip: "content-box",
                    // }
                //     *::-webkit-scrollbar-thumb:hover {
                //         backgroundColor: "#A8A8A8"
                //     }
                //     *::-webkit-scrollbar-track:hover {
                //       background-color: ${palette.secondary.dark};
                //     }
                //     *::-webkit-scrollbar-track:active {
                //       background-color: ${palette.secondary.dark};
                //     }
                return `
                    ::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }

                    ::-webkit-scrollbar-track {
                        background: transparent;
                    }

                    ::-webkit-scrollbar-thumb {
                        background-color: rgba(0, 0, 0, 0.2);
                        border-radius: 20px;
                        border: 2px solid transparent;
                        background-clip: content-box;
                    }

                    ::-webkit-scrollbar-thumb:hover {
                        background-color: rgba(0, 0, 0, 0.4);
                    }
                `;
            }
        },
        MuiButton: {
            styleOverrides: {
            },
            defaultProps: {
                // variant: "contained",
                // disableElevation: true,
            },
        },
        MuiStack: {
            defaultProps: {
                gap: 2,
            },
        },
    }
});
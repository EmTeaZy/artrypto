import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        h1: {
            fontWeight: 100,
        },
        h3: {
            fontWeight: 100,
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '1rem',
                },
            },
        },
    },
});

import {createContext, useContext, useState} from 'react'
import {Alert, Snackbar} from "@mui/material";

export const SnackbarContext = createContext({});

export const useSnackbar = () => useContext(SnackbarContext)

export const SnackbarContextProvider = ({children}) => {

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [message, setMessage] = useState("This is a success message!")

    const show = (message = "Success!", severity = "success") => {
        setMessage(message)
        setSeverity(severity)
        setOpen(true)
    }

    const hide = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false);
    };

    return(
        <SnackbarContext.Provider value={{show}}>
            <Snackbar open={open} autoHideDuration={6000} onClose={hide}>
                <Alert onClose={hide} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            {children}
        </SnackbarContext.Provider>
    )
}

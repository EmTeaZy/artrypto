import {SnackbarContextProvider} from "../context/SnackbarContextProvider";
import {AuthContextProvider} from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Head from "../components/Head";
import {ThemeProvider} from "@mui/material/styles";
import {useRouter} from "next/router";
import {theme} from '../styles/global_theme'
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import ProtectedRoute from "../components/ProtectedRoute";

const publicRoutes = ["/admin/login", "/admin/signup", "/admin/about", "/", "/user"];

function MyApp({Component, pageProps}) {
    const router = useRouter();

    return (
        <>
            <ThemeProvider theme={theme}>
                <AuthContextProvider>
                    <SnackbarContextProvider>
                        <Head><title> Artrypto </title></Head>
                        <Navbar/>
                        {publicRoutes.includes(router.pathname) ? (
                            <Component {...pageProps} />
                        ) : (
                            <ProtectedRoute>
                                <Component {...pageProps} />
                            </ProtectedRoute>
                        )}
                    </SnackbarContextProvider>
                </AuthContextProvider>
            </ThemeProvider>
        </>
    );
}

export default MyApp;

import {SnackbarContextProvider} from "../context/SnackbarContextProvider";
import {AuthContextProvider} from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import {ThemeProvider} from "@mui/material/styles";
import wagmiClient from "../config/wagmiClient";
import Navbar from "../components/Navbar";
import theme from ".././src/theme/theme";
import Head from "../components/Head";
import {useRouter} from "next/router";
import {WagmiConfig} from "wagmi";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

const publicRoutes = ["/admin/login", "/", "/account", "/about"];

function MyApp({Component, pageProps}) {

    const router = useRouter();

    return (
        <>
            <ThemeProvider theme={theme}>
                <AuthContextProvider>
                    <SnackbarContextProvider>
                        <Head><title> Artrypto </title></Head>
                        <Navbar/>
                        <WagmiConfig client={wagmiClient}>
                            {publicRoutes.includes(router.pathname) ? (
                                <Component {...pageProps} />
                            ) : (
                                <ProtectedRoute>
                                    <Component {...pageProps} />
                                </ProtectedRoute>
                            )}
                        </WagmiConfig>

                    </SnackbarContextProvider>
                </AuthContextProvider>
            </ThemeProvider>
        </>
    );
}

export default MyApp;

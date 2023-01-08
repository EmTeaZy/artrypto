import {SnackbarContextProvider} from "../context/SnackbarContextProvider";
import {AuthContextProvider} from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import {ThemeProvider} from "@mui/material/styles";
import wagmiClient from "../config/wagmiClient";
import Navbar from "../components/Navbar";
import theme from ".././utils/theme/theme";
import Head from "../components/Head";
import {useRouter} from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../utils/globals.css";
import {WagmiConfig} from "wagmi";
import {CacheProvider} from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";

const publicRoutes = [
  "/admin/login",
  "/admin/signup",
  "/admin/about",
  "/",
  "/account",
  "/account/settings",
  "/artwork/create",
];

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
function MyApp(props) {
  const router = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <AuthContextProvider>
            <SnackbarContextProvider>
              <Head />
              <WagmiConfig client={wagmiClient}>
              <Navbar />
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
      </CacheProvider>
    </>
  );
}

export default MyApp;

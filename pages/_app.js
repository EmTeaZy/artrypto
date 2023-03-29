import { SnackbarContextProvider } from "../context/SnackbarContextProvider";
import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/Navbar";
import theme from ".././utils/theme/theme";
import Head from "../components/Head";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../utils/globals.css";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import SwitchGoerli from "../components/SwitchGoerli";
import { ThirdwebProvider, useAddress } from "@thirdweb-dev/react";
const publicRoutes = [
  "/admin/login",
  "/admin/signup",
  "/admin/about",
  "/",
  "/account",
  "/account/settings",
  "/artwork/create",
  "/view/profile",
];

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
function MyApp(props) {
  const router = useRouter();
  const address = useAddress();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <ThirdwebProvider activeChain="goerli">
            <AuthContextProvider>
              <SnackbarContextProvider>
                <Head />
                <SwitchGoerli />
                {(!router.pathname.includes("admin") ||
                  router.pathname.includes("login")) && <Navbar />}
                {publicRoutes.includes(router.pathname) ? (
                  <Component {...pageProps} />
                ) : (
                  <ProtectedRoute>
                    <Component {...pageProps} />
                  </ProtectedRoute>
                )}
                {/*<Footer/>*/}
              </SnackbarContextProvider>
            </AuthContextProvider>
          </ThirdwebProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;

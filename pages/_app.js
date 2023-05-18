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
import {
  ThirdwebProvider,
  ThirdwebSDKProvider,
  useAddress,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
const publicRoutes = [
  "/admin/login",
  "/admin/signup",
  "/admin/about",
  "/",
  "/account",
  "/account/settings",
  "/account/verification",
  "/artwork/create",
  "/view/profile",
  "/nfts/search",
  "/nfts/[contractAddress]/[id]",
  "/nfts/[contractAddress]/[id]/sell",
  "/nfts/[contractAddress]/[id]/exchange",
  "/nfts/listedsale",
];

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
function MyApp(props) {
  const router = useRouter();
  const address = useAddress();
  const [mysigner, changeSigner] = useState();
  useEffect(() => {
    changeSigner(
      new ethers.providers.Web3Provider(window.ethereum).getSigner()
    );
  }, []);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <ThirdwebSDKProvider activeChain="mumbai" signer={mysigner}>
            <ThirdwebProvider activeChain="mumbai">
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
          </ThirdwebSDKProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;

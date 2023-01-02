import { SnackbarContextProvider } from "../context/SnackbarContextProvider";
import { AuthContextProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Head from "../components/Head";

const publicRoutes = ["/login", "/", "/signup", "/about", "/user"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <AuthContextProvider>
        <SnackbarContextProvider>
          <Head />
          <Navbar />
          {publicRoutes.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <Component {...pageProps} />
          )}
        </SnackbarContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;

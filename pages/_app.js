import {SnackbarContextProvider} from "../context/SnackbarContextProvider";
import {AuthContextProvider} from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import {useRouter} from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

const publicRoutes = ['/login', '/', '/signup', '/about']

function MyApp({Component, pageProps}) {

    const router = useRouter()

    return (
        <>
            <AuthContextProvider>
                <SnackbarContextProvider>
                    <Navbar/>
                    {
                        publicRoutes.includes(router.pathname) ?
                            <Component {...pageProps} />
                            :
                            <ProtectedRoute>
                                <Component {...pageProps} />
                            </ProtectedRoute>
                    }
                </SnackbarContextProvider>
            </AuthContextProvider>
        </>
    )
}

export default MyApp

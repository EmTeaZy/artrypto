import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "../components/Navbar";
import {AuthContextProvider} from "../context/AuthContext";
import {useRouter} from "next/router";
import ProtectedRoute from "../components/ProtectedRoute";

const publicRoutes = ['/login', '/', '/signup', '/about']

function MyApp({Component, pageProps}) {

    const router = useRouter()

    return (
        <>
            <AuthContextProvider>
                <Navbar/>
                {
                    publicRoutes.includes(router.pathname) ?
                    <Component {...pageProps} />
                    :
                    <ProtectedRoute>
                        <Component {...pageProps} />
                    </ProtectedRoute>
                }
            </AuthContextProvider>
        </>
    )
}

export default MyApp

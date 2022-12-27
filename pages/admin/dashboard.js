import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { AuthContextProvider } from '../../context/AuthContext';

const Dashboard = () => {
    const currentUser  = useContext(AuthContextProvider);
    const router = useRouter()
    useEffect(() => {
        if (currentUser) {
          console.log("signed in!");
        } else if (currentUser == null) {
          router.push("/admin/login");
        }
      }, [currentUser]);
    
      if (!currentUser) {
        // user is signed out or still being checked.
        // don't render anything
        return null;
      }
    return (
        <div className="text-center mt-5">
            <h1>This route is protected</h1>
        </div>
    )
}

export default Dashboard
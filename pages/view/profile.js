import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import CreatedNFTs from '../../components/AccountComponents/CreatedNFTs';
import UserDetails from '../../components/AccountComponents/UserDetails';

const Profile = () => {
    const router = useRouter();
    const [user,setUser]=useState();
  return (
   <>
         <Box bgcolor={"primary.main"} px={8} py={4}>
                <UserDetails user={router.query} check={"null"}/>
                <hr style={{borderColor:"white"}}/>
                <CreatedNFTs address={router.query.walletAddress} />
            </Box>
   </>
  )
}

export default Profile
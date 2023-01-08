import { Typography } from '@mui/material'
import React from 'react'
import { useAccount } from 'wagmi'
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
const ConnectStatus = () => {
    const {address,isConnected}=useAccount()
  return (
   <>
     {isConnected?<CheckSharpIcon fontSize='small' color="success"/>:<ClearSharpIcon fontSize='small' color="danger"/>}
     <Typography color={isConnected?"text.success":"text.danger"} variant="connectStatus">{isConnected?"connected":"not connected"}</Typography>
   </>
  )
}

export default ConnectStatus
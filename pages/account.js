import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi';

const Account = () => {

  const { address, isConnected } = useAccount();


  return (
    <div><p>Account Address {address}</p></div>
  )
}

export default Account
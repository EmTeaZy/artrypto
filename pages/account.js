import React, { useEffect, useState } from 'react'

const Account = () => {
  const [account,setAccount]=useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected(setAccount);
  }, []);


  async function checkIfWalletIsConnected(onConnected) {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        const account = accounts[0];
        onConnected(account);
        setWalletConnected(true)
        return;
      }
    }
  }
  return (
    <div><p>Account Address {account}</p></div>
  )
}

export default Account
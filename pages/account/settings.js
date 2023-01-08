import {Box} from "@mui/material";
import React from "react";
import {useAccount} from "wagmi";
import SettingsForm from "../../components/SettingsForm";
import FullLayout from "../../src/layouts/FullLayout";


const Settings = () => {
  const { address } = useAccount()
  return (
    <>
      <FullLayout check={"user"}>
        <Box>
        <SettingsForm walletAddress={address}/>
        </Box>
      </FullLayout>
    </>
  );
};

export default Settings;

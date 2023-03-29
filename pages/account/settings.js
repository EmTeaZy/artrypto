import { Box } from "@mui/material";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";
import SettingsForm from "../../components/SettingsForm";
import FullLayout from "../../src/layouts/FullLayout";

const Settings = () => {
  const address = useAddress();
  return (
    <>
      <FullLayout check={"user"}>
        <Box>
          <SettingsForm walletAddress={address} />
        </Box>
      </FullLayout>
    </>
  );
};

export default Settings;

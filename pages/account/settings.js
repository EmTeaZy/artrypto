import { Box, Typography } from "@mui/material";
import React from "react";
import SettingsForm from "../../components/SettingsForm";
import FullLayout from "../../src/layouts/FullLayout";

const Settings = () => {
  return (
    <>
      <FullLayout check={"user"}>
        <Box>
        <SettingsForm/>
        </Box>
      </FullLayout>
    </>
  );
};

export default Settings;

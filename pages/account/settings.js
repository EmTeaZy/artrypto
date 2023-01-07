import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import SettingsForm from "../../components/SettingsForm";
import FullLayout from "../../src/layouts/FullLayout";


const Settings = () => {
    useEffect(()=>{
        fetch("/api/hello").then((res)=>res.json()).then((data)=>console.log(data))
    })
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

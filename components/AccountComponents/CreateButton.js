import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import { Tooltip } from "@mui/material";

const CreateButton = (props) => {
  const router = useRouter();
  return (
    <>
      <Box>
        <Tooltip title="Mint NFT">
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={() => router.push("/artwork/create")}
            color="light"
          >
            <AddIcon
              fontSize="medium"
              sx={{
                "&:hover": {
                  color: "#EFBA0A",
                },
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Update User">
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={() => router.push("/account/settings")}
            color="light"
          >
            <SettingsSharpIcon
              sx={{
                "&:hover": {
                  color: "#EFBA0A",
                },
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

export default CreateButton;

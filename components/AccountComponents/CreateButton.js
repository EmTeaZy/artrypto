import React from "react";
import {withStyles} from "@material-ui/styles";
import AddIcon from '@mui/icons-material/Add';
import {Box, IconButton} from "@mui/material";
import {useRouter} from "next/router";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
//hover of nav-elements
const styles = {
  navlinkhover: {
    "&:hover": {
      color: "#EFBA0A",
    },
  },
};
const CreateButton = (props) => {
  const router = useRouter();
  return (
    <>
      <Box>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={() => router.push("/artwork/create")}
          color="light"
        >
          <AddIcon fontSize="medium" className={props.classes.navlinkhover} />
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={() => router.push("/account/settings")}
          color="light"
        >
          <SettingsSharpIcon className={props.classes.navlinkhover}/>
        </IconButton>
      </Box>
    </>
  );
};

export default withStyles(styles)(CreateButton);

import React from 'react'
import CreateSharpIcon from '@mui/icons-material/CreateSharp';
import {withStyles} from "@material-ui/styles";
import Button from "@mui/material/Button";
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';
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
    <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={()=>router.push("/artwork/create")}
                color="inherit"
              >

        <CreateSharpIcon className={props.classes.navlinkhover} />
              </IconButton>
    </>
  )
}

export default withStyles(styles)(CreateButton)
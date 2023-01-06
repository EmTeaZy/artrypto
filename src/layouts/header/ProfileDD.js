import React from "react";
import FeatherIcon from "feather-icons-react";
import {Box, Button, Divider, Link, List, ListItemButton, ListItemText, Menu, Typography,} from "@mui/material";
import {useAuth} from "../../../context/AuthContext";
import {useRouter} from "next/router";
import {useSnackbar} from "../../../context/SnackbarContextProvider";

const ProfileDD = () => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const {user, logout} = useAuth();
  const router = useRouter()
  const {show} = useSnackbar();

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
    router.push("/admin/login").then(() => show("Logged out successfully"))
  }

  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{ ml: 1 }}
            >
              Hi,
            </Typography>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {user.name}
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
          },
        }}
      >
        <Box>
          <Box p={2} pt={0}>
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              onClick={handleClose4}
            >
              <ListItemButton>
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Account" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Change Password" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="My Settings" />
              </ListItemButton>
            </List>
          </Box>
          <Divider />
          <Box p={2}>
            <Link to="/">
              <Button
                  onClick={handleLogout}
                  fullWidth
                  variant="contained"
                  color="primary">
                Logout
              </Button>
            </Link>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileDD;

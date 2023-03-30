import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { IconButton, Typography, useMediaQuery } from "@mui/material";
import Searchbar from "./NavbarComponents/Searchbar";
import Iconbutton from "./NavbarComponents/Icon-button";
import { AccountCircle } from "@mui/icons-material";
import AdminPanelSettingsTwoToneIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import { useRouter } from "next/router";
import { withStyles } from "@material-ui/styles";
import { useTheme } from "@mui/material/styles";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { useSnackbar } from "../context/SnackbarContextProvider";
import { Tooltip } from "@material-ui/core";

//hover of nav-elements
const styles = {
  navlinkhover: {
    "&:hover": {
      color: "#EFBA0A",
    },
  },
};
const NavbarComp = (props) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { show } = useSnackbar();

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const router = useRouter();
  //metamask account hook
  const address = useAddress();
  const [buttonStatus, changeStatus] = useState("Connect To Metamask Wallet");

  //dialogbox
  // const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = async () => {
    if (!address) {
      show("Please connect your wallet first", "danger");
    } else router.push("/account");
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"
          onClick={handleClickOpen}
        >
          <AccountCircle />
        </IconButton>
        <Typography color="text.secondary">Profile</Typography>
      </MenuItem>
      <MenuItem
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <IconButton
          size="large"
          edge="end"
          aria-label="admin"
          onClick={() => {
            router.push("/admin");
          }}
          color="primary"
        >
          <AdminPanelSettingsTwoToneIcon />
        </IconButton>
        <Typography color="text.secondary">Admin</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            bgcolor: "primary.main",
            py: "8px",
            position: "sticky",
            top: "0",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Iconbutton />
            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              <Searchbar />
            </Box>
            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              <Tooltip title="Account">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleClickOpen}
                  color="inherit"
                >
                  <AccountCircle className={props.classes.navlinkhover} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Admin Panel">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="admin"
                  onClick={() => {
                    router.push("/admin");
                  }}
                  color="inherit"
                >
                  <AdminPanelSettingsTwoToneIcon
                    className={props.classes.navlinkhover}
                  />
                </IconButton>
              </Tooltip>
              <Box mx={1}>
                <ConnectWallet
                  accentColor="transparent"
                  colorMode="dark"
                  className=""
                />
              </Box>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                color="inherit"
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Box>
    </>
  );
};
export default withStyles(styles)(NavbarComp);

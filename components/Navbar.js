import { useState } from "react"; 
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoIcon from "../src/layouts/logo/LogoIcon";
import { display } from "@mui/system";
import { IconButton, Link } from "@mui/material";
import Searchbar from "./NavbarComponents/Searchbar";
import Iconbutton from "./NavbarComponents/Icon-button";
import { AccountCircle } from "@mui/icons-material";
import AdminPanelSettingsTwoToneIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import { useRouter } from "next/router";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { withStyles } from "@material-ui/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

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
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            size="large"
            edge="end"
            aria-label="admin"
            onClick={() => {
              router.push("/admin");
            }}
            color="inherit"
          >
            <AdminPanelSettingsTwoToneIcon />
          </IconButton>
          <p>Admin</p>
        </Box>
      </MenuItem>
    </Menu>
  );

  const router = useRouter();
  //metamask account hook
  const { address, isConnected } = useAccount();
  const [buttonStatus,changeStatus]=useState("Connect To Metamask Wallet");
  //metamask connection
  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });
  //dialog box of connecting to wallet
  const connectWallet = async () => {
    if (!isConnected) {
    try {
        changeStatus("Loading...")
        await connectAsync();
        setOpen(false);
        router.push("/account")
    } catch (error) {
       changeStatus("Connect To Metamask Wallet")
    }
    } else router.push("/account");
  };

  //dialogbox
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    if (!isConnected) {
        changeStatus("Connect To Metamask Wallet")
      setOpen(true);
    } else router.push("/account");
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar  sx={{ bgcolor: "primary.main", py: "8px",position:"sticky",top:"0" }}>
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
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                //onClick={handleMobileMenuOpen}
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
      <Dialog
        fullScreen={fullScreen}
        open={open && !isConnected}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          bgcolor={"primary.main"}
          color="#EFB813"
          sx={{ fontSize: "24px", fontWeight: "800px" }}
        >
          {"Connect Metamask Account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText mt={4} color="black" sx={{ fontSize: "16px" }}>
            Metamask connection is needed to make your profile on Artrypto. Do
            you want to Connect your metamask wallet to Artrypto.
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button
            color="success"
            onClick={connectWallet}
            autoFocus
            sx={{ fontSize: "18px", width: "100%" }}
          >
          <Box  mx={2}>
            <Image src="/mm.png" width="30" height="30" alt="metamask" ></Image>
          </Box>
            {buttonStatus}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default withStyles(styles)(NavbarComp);

const components = {
  MuiCssBaseline: {
    styleOverrides: {
      "*": {
        boxSizing: "border-box",
      },
      html: {
        height: "100%",
        width: "100%",
      },
      body: {
        height: "100%",
        margin: 0,
        padding: 0,
      },
      "#root": {
        height: "100%",
      },
      "*[dir='rtl'] .buyNowImg": {
        transform: "scaleX(-1)",
      },

      ".buyNowImg": {
        position: "absolute",
        right: "-44px",
        top: "-18px",
        width: "143px",
        height: "175px",
      },
      ".MuiCardHeader-action": {
        alignSelf: "center !important",
      },
      ".scrollbar-container": {
        borderRight: "0 !important",
      },
      "*[dir='rtl'] .welcomebg:before": {
        backgroundPosition: "top -24px left -9px !important",
      },
    },
  },
  MuiIcon:{
    styleOverrides: {
      root: {
        color: "white"
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: "15px !important",
        paddingRight: "15px !important",
        maxWidth: "1600px",
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        backgroundColor: "#000000",
        color: "#F2B809",
        textTransform: "none",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
          backgroundColor: "#121213",
        },
      },
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: {
        ".mui-style-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":{
          "-webkit-text-fill-color": "rgba(255, 255, 255, 0.3)",
        }
      }
    },
  },

  MuiListItem: {
    styleOverrides: {
      root: {
        borderRadius: "9px",
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "20px",
        padding: "14px",
        margin: "15px",
        boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
      },
    },
  },

  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: "40px",
      },
    },
  },

  MuiGridItem: {
    styleOverrides: {
      root: {
        paddingTop: "30px",
        paddingLeft: "30px !important",
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: "#ecf0f2",
        borderRadius: "6px",
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: "0",
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: "500",
        fontSize: "0.75rem",
      },
    },
  },
};

export default components;

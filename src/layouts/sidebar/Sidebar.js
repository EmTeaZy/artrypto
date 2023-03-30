import React, {useEffect, useState} from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery,} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import LogoIcon from "../logo/LogoIcon";
import Menuitems from "./MenuItems";
import UserSettings from "./UserSettings";
import {useRouter} from "next/router";
import {useAuth} from "../../../context/AuthContext";

const Sidebar = ({isMobileSidebarOpen, onSidebarClose, isSidebarOpen,check}) => {

    const [open, setOpen] = useState(true);
    const {getUserRole} = useAuth();
    const curl = useRouter();
    const location = curl.pathname;
    const [items, setItems] = useState([]);

    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

    const handleClick = (index) => {
        if (open === index) {
            setOpen((prevopen) => !prevopen);
        } else {
            setOpen(index);
        }
    };

    const filterItems = async () => {
        if(check==="admin") {
            const role = await getUserRole();
            if (role === "superadmin")
                setItems(Menuitems);
            else
                setItems(Menuitems.filter(i => i.title !== "Admins"));
        }
        else
            setItems(UserSettings);
    }

    useEffect(() => filterItems, [])

    const SidebarContent = (
        <Box p={2}  height="100%" bgcolor={"primary.main"}>
        {check==="admin"? <LogoIcon toLink={"/admin"}/>:<LogoIcon toLink={"/"}/>}
            <Box mt={4}>
                <List>
                    {items.map((item, index) => (
                        <List component="li" disablePadding key={item.title}>
                            <NextLink href={item.href}>
                                <ListItem
                                    onClick={() => handleClick(index)}
                                    button
                                    selected={location === item.href}
                                    sx={{
                                        mb: 1,
                                        ...(location === item.href && {
                                            color: "white",
                                            backgroundColor: (theme) =>
                                                `${theme.palette.secondary.main}!important`,
                                        }),
                                    }}
                                >
                                    <ListItemIcon>
                                        <FeatherIcon
                                            style={{
                                                color: `${location === item.href ? "black" : "white"} `,
                                            }}
                                            icon={item.icon}
                                            width="20"
                                            height="20"
                                        />
                                    </ListItemIcon>

                                    <ListItemText style={{
                                                color: `${location === item.href ? "black" : "white"} `,
                                            }} onClick={onSidebarClose}>
                                        {item.title}
                                    </ListItemText>
                                </ListItem>
                            </NextLink>
                        </List>
                    ))}
                </List>
            </Box>
        </Box>
    );
    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open={isSidebarOpen}
                variant="persistent"
                PaperProps={{
                    sx: {
                        width: "265px",
                        border: "0 !important",
                        boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
                    },
                }}
            >
                {SidebarContent}
            </Drawer>
        );
    }
    return (
        <Drawer
            anchor="left"
            open={isMobileSidebarOpen}
            onClose={onSidebarClose}
            PaperProps={{
                sx: {
                    width: "265px",
                    border: "0 !important",
                },
            }}
            variant="temporary"
        >
            {SidebarContent}
        </Drawer>
    );
};

Sidebar.propTypes = {
    isMobileSidebarOpen: PropTypes.bool,
    onSidebarClose: PropTypes.func,
    isSidebarOpen: PropTypes.bool,
};

export default Sidebar;

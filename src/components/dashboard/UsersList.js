import React, {useEffect, useState} from "react";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography,} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from "next/link";
import { useRouter } from "next/router";

const UsersList = () => {

    const [users, setUsers] = useState([]);
    const router = useRouter();

    useEffect(() => fetchUsers, [])

    const fetchUsers = () => {
        axios.get("/api/getUsers")
            .then(res => {
                console.log(res.data);
                setUsers(res.data)
            })
            .catch(err => console.error("Fetching users error: ", err))
    }

    return (
        <BaseCard title="Users">
            <Table
                aria-label="simple table"
                sx={{
                    mt: 3,
                    whiteSpace: "nowrap",
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography color="primary" variant="h6">
                                Username
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="primary" variant="h6">
                                Email
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="primary" variant="h6">
                                Wallet Address
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="primary" variant="h6">

                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>
                                <Typography color="primary" variant="subtitle2">
                                    {user.username}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="primary" variant="subtitle2">
                                    {user.email || "N/A"}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="primary" variant="subtitle2">
                                    {user.walletAddress}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                            <IconButton onClick={()=>{
                                console.log(user)
                                router.push({pathname:"/view/profile",query: user})

                                }}>
                                <VisibilityIcon color="primary" sx={{cursor: "pointer"}}/>
                            </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </BaseCard>
    );
};

export default UsersList;

import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, Typography,} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';

const UsersList = () => {

    const [users, setUsers] = useState([]);

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
                                <VisibilityIcon color="primary" sx={{cursor: "pointer"}}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </BaseCard>
    );
};

export default UsersList;

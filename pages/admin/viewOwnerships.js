import React from "react";
import {Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import FullLayout from "../../src/layouts/FullLayout";
import BaseCard from "../../src/components/baseCard/BaseCard";

const ownerships = [
    {id: 1, name: 'John', date: "2d ago", },
    {id: 2, name: 'Bartholomew', date: "2d ago", },
    {id: 3, name: 'Plem', date: "2d ago", },
    {id: 4, name: 'Floza', date: "2d ago", },
    {id: 5, name: 'Merioca', date: "2d ago", },
    {id: 6, name: 'Ferhenstein', date: "2d ago", },
]

const ViewOwnerships = () => {

    return (
        <>
            <FullLayout check={"admin"}>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard title="Ownerships">
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
                                                Name of the owner
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="primary" variant="h6">
                                                Date
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="primary" variant="h6">

                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ownerships.map((o) => (
                                        <TableRow key={o.id}>
                                            <TableCell>
                                                <Typography color="primary" variant="subtitle2">
                                                    {o.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="primary" variant="subtitle2">
                                                    {o.date || "N/A"}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </BaseCard>
                    </Grid>
                </Grid>
            </FullLayout>
        </>
    );
};

export default ViewOwnerships;

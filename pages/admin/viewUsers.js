import React from "react";
import {Grid} from "@mui/material";
import UsersList from "../../src/components/dashboard/UsersList";
import FullLayout from "../../src/layouts/FullLayout";

const ViewUsers = () => {
    return (
        <>
            <FullLayout check={"admin"}>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <UsersList/>
                    </Grid>
                </Grid>
            </FullLayout>
        </>
    );
};

export default ViewUsers;

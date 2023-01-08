import React from "react";
import {Grid} from "@mui/material";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import UsersList from "../../src/components/dashboard/UsersList";
import FullLayout from "../../src/layouts/FullLayout";

export default function Home() {
    return (
        <>
            <FullLayout check={"admin"}>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <SalesOverview />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <DailyActivity />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <UsersList />
                    </Grid>
                </Grid>
            </FullLayout>
        </>
    )
}

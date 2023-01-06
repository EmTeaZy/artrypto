import React from "react";
import {Grid} from "@mui/material";
import ProductPerformance from "../../src/components/dashboard/ProductPerformance";
import FullLayout from "../../src/layouts/FullLayout";

const ViewUsers = () => {
    return (
        <>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <ProductPerformance/>
                    </Grid>
                </Grid>
            </FullLayout>
        </>
    );
};

export default ViewUsers;

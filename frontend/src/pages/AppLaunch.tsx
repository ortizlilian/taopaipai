import React  from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CameraBox from "../Components/CameraBox";
import "../styles/AppLaunch.css";

const AppLaunch = () => {
    return (
        <>
        <Grid item xs={2}>
            <></>
        </Grid>
        <Grid item xs={8}>
            <>
            <div className="applaunch">
                <div className="applaunch-heading">
                    <h1>Tao Pai Pai web application</h1>
                </div>

                <div className="applaunch-main">
                    <CameraBox />
                </div>

                <div className="applaunch-download">
                    <p>Click here to download the user manual</p>
                    <Button variant="contained">Download</Button>
                </div>
            </div>
            </>
        </Grid>
        <Grid item xs={2}>
            <></>
        </Grid>
        </>
    );
};

export default AppLaunch;

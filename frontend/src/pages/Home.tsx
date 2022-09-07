import React  from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Newsletter from "../Components/Newsletter";

import "../styles/Home.css";

const Home = () => {
    return (
        <>
            <Grid item xs={2}>
                <></>
            </Grid>
            <Grid item xs={8}>
                <div>
                    <div className="home-heading">
                        <h1>Welcome to the world of Fitness with Machine Learning.</h1>
                    </div>

                    <div className="home-banner">
                        <span>
                            Tao pai pai is a machine learning tool that helps you track your
                            reps and sets, allowing you to focus on what really matters:
                            building muscles.
                        </span>
                        <img src="./home_1.jpeg" alt="home 1" />
                        <div className="clear"></div>
                    </div>

                    <div className="home-launch">
                        <h2>Start now building muscles with a little help of AI</h2>
                        <Button href="/app" variant="contained">
                            Launch
                        </Button>
                    </div>
                </div>
            </Grid>
            <Grid item xs={2}>
                <></>
            </Grid>
            <Grid item xs={12}>
                <div id="newsletter">
                    <Newsletter />
                </div>
            </Grid>
        </>
    );
};

export default Home;

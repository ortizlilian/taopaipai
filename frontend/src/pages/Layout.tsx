import React  from 'react';
/* eslint-disable jsx-a11y/anchor-has-content */
import { Outlet, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Layout = () => {
    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <></>
                </Grid>
                <Grid item xs={3}>
                    <nav className="main-menu">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </nav>
                </Grid>

                <Grid item xs={2}>
                    <div className="main-logo">tao pai pai</div>
                </Grid>

                <Grid item xs={3}>
                    <div className="main-social">
                        <ul>
                        <li className="youtube">
                            <a
                            href="https://www.youtube.com/channel/UCrAppnWF04mB-_Dev6SyICA"
                            title="Youtube"
                            target="blank"
                            ></a>
                        </li>
                        <li className="instagram">
                            <a
                            href="https://www.instagram.com/taopaipai.ai/"
                            title="Instagram"
                            target="blank"
                            ></a>
                        </li>
                        <li className="facebook">
                            <a
                            href="https://www.facebook.com/Tao-Pai-Pai-App-100167426181838"
                            title="Facebook"
                            target="blank"
                            ></a>
                        </li>
                        </ul>
                    </div>
                </Grid>

                <Grid item xs={2}>
                    <></>
                </Grid>

                <Outlet />

                <Grid item xs={12}>
                    <div id="footer">
                        <p>tao pai pai</p>
                        <span>&copy; 2022 Tao Pai Pai Ltd | All rights reserved</span>
                    </div>
                </Grid>
            </Grid>
        </Box>
        </>
    );
};

export default Layout;

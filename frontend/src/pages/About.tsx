import React  from 'react';
import Grid from "@mui/material/Grid";
import "../styles/About.css";

const About = () => {
    return (
        <>
        <Grid item xs={2}>
            <></>
        </Grid>
        <Grid item xs={8}>
            <>
            <div>
                <div className="about-heading">
                <h1>What is Tao Pai Pai?</h1>
                </div>

                <div className="about-banner">
                <img src="./about.jpeg" alt="home 1" />
                <span>
                    <p>Tao Pai Pai is a web based application designed to assist you
                    during your workouts by counting repetitions of the exercises
                    you are performing and keeping track of your sets.</p>

                    <p>The application's name was inspired by a secondary
                    character from a Japanese anime with incomparable strength. He
                    challenges the main character, who gets stronger in order to
                    beat Tao Pai Pai. Tao Pai Pai app was developed with this same
                    goal, helping people get fitter and stronger.</p>
                    
                    <p>Tao Pai Pai's job is to discharge people from having to
                    count repetitions, so you can focus all attention and energy on
                    performing the exercises in the correct form. Besides solving
                    the annoying problem of losing rep count, Tao Pai Pai increases
                    the effectiveness of your training, since you can concentrate
                    solely on giving your best during the workout.</p>
                    
                    <p> The application captures users' movements through a
                    webcam and processes these data using a machine learning
                    algorithm. Once the user's movement matches with the exercise
                    selected, the application computes the repetition.</p>
                    
                    <p> Let us start working towards our fitness goals with a
                    little help from Tao Pai Pai.</p>
                </span>
                <div className="clear"></div>
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

export default About;

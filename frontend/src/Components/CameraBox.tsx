import React, { useState } from "react";
import { Pose } from "@mediapipe/pose";
import Details from "../Components/Details";
import Webcam from "react-webcam";
import { Camera } from "@mediapipe/camera_utils";
import {
    setRepsCountValue,
    setSetsCountValue,
    setDefaultRepsCountValue,
} from "../context/exerciseControl";
import { useDispatch } from "react-redux";
import ExerciseList from "../Components/ExerciseList";

import "../styles/components/CameraBox.css";

let camera: any = null;

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
};

const pose = new Pose({
    locateFile: (file: any) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    },
});

pose.setOptions({
    modelComplexity: 0,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
});

const DB_DATA = {
    break: false,
    maxReps: 5,
    maxSets: 3,
    countReps: 0,
    countSets: 1,
    completed: false,
    stage: "down",
    model: [
        {
            down: 160,
            up: 30,
            pose: [12, 14, 16],
            live_angle: 0,
        },
        {
            down: 160,
            up: 30,
            pose: [11, 13, 15],
            live_angle: 0,
        },
    ],
};

function calculate_angle(a: any, b: any, c: any) {
    let radians =
        Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);

    if (angle > 180.0) {
        angle = 360 - angle;
    }
    return angle;
}

function DetectReps(dispatch: any): void {
    if (
        DB_DATA.countReps === DB_DATA.maxReps &&
        DB_DATA.countSets === DB_DATA.maxSets
    ) {
        DB_DATA.completed = true;
        return;
    }

    let a = DB_DATA.model.reduce(
        (previousValue: any, currentValue: any) =>
        previousValue + currentValue.live_angle,
        0
    );

    let b = DB_DATA.model.reduce(
        (previousValue: any, currentValue: any) =>
        previousValue + currentValue.down,
        0
    );

    let c = DB_DATA.model.reduce(
        (previousValue: any, currentValue: any) => previousValue + currentValue.up,
        0
    );

    if (a > b) {
        DB_DATA.stage = "down";
    }

    if (a < c && DB_DATA.stage === "down") {
        if (DB_DATA.break === true) {
            DB_DATA.break = false;

            DB_DATA.stage = "up";
            DB_DATA.countSets += 1;
            dispatch(setSetsCountValue(DB_DATA.countSets));
            dispatch(setDefaultRepsCountValue(1));
            DB_DATA.countReps = 0;
        }
        if (DB_DATA.countReps < DB_DATA.maxReps) {
            DB_DATA.stage = "up";
            DB_DATA.countReps += 1;
            dispatch(setRepsCountValue(DB_DATA.countReps));
        }

        if (
            DB_DATA.countReps === DB_DATA.maxReps &&
            DB_DATA.countSets < DB_DATA.maxSets
        ) {
            DB_DATA.break = true;
        }
    }
}

const CameraBox = () => {
    const webcamRef = React.useRef<Webcam>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cameraReady, setCameraReady] = useState(false);
    const [breakTime, setBreakTime] = useState(false);
    const [exerciseComplete, setExerciseComplete] = useState(false);

    const dispatch = useDispatch();

    function onResults(results: any) {
        if (results.poseLandmarks) {
            let landmarks = results.poseLandmarks;

            if (DB_DATA.completed === true) {
                setExerciseComplete(true);
            } else {
                setExerciseComplete(false);
            }

            if (DB_DATA.break === true && DB_DATA.completed === false) {
                setBreakTime(true);
            } else {
                setBreakTime(false);
            }

            DB_DATA.model.forEach((model) => {
                model.live_angle = calculate_angle(
                    landmarks[model.pose[0]],
                    landmarks[model.pose[1]],
                    landmarks[model.pose[2]]
                );
            });

            DetectReps(dispatch);
        }
    }

    pose.onResults(onResults);

    if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        camera === null
    ) {
        // @ts-ignore
        camera = new Camera(webcamRef.current?.video, {
            onFrame: async () => {
                if (webcamRef.current !== null) {
                    // @ts-ignore
                    await pose.send({ image: webcamRef.current?.video });
                }
            },
            width: 1280,
            height: 720,
        });
        camera.start();
    }

    return (
        <div id="component-camerabox">
            <ExerciseList exercise={DB_DATA} />
            <div className="set-break">
                {breakTime === true && exerciseComplete === false && (
                    <>Set Break</>
                )}
            </div>
            <div className="exercise-complete">
                {exerciseComplete === true && (
                    <>Exercise successfully completed</>
                )}
            </div>
            <Webcam
                style={{ display: "absolute" }}
                audio={false}
                height={720}
                ref={webcamRef}
                width={1280}
                videoConstraints={videoConstraints}
                onUserMedia={() => {
                    setCameraReady(true);
                }}
            />
            <Details exercise={DB_DATA} />
        </div>
    );
};

export default CameraBox;

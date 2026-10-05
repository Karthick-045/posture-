import { useEffect, useRef, useState } from "react";

import { createPose } from "../posture-engine/mediapipe_detector";
import { calculateAngle } from "../posture-engine/angle_calculator";
import { classifyPosture } from "../posture-engine/posture_classifier";
import { updateScore } from "../posture-engine/score_manager";
import { savePostureData } from "../posture-engine/api_client";

function LiveMonitor() {

    const videoRef = useRef(null);

    const [angle, setAngle] = useState(0);
    const [status, setStatus] = useState("GOOD");
    const [score, setScore] = useState(0);

    // Duplicate Prevention
    const lastSavedAngle = useRef(null);
    const lastSavedStatus = useRef(null);
    const lastSaveTime = useRef(Date.now());

    function shouldSave(
        currentAngle,
        currentStatus
    ) {

        const now = Date.now();

        // First Save
        if (
            lastSavedAngle.current === null
        ) {

            lastSavedAngle.current =
                currentAngle;

            lastSavedStatus.current =
                currentStatus;

            lastSaveTime.current =
                now;

            return true;
        }

        const angleDiff =
            Math.abs(
                currentAngle -
                lastSavedAngle.current
            );

        const statusChanged =
            currentStatus !==
            lastSavedStatus.current;

        const timeExceeded =
            (
                now -
                lastSaveTime.current
            ) > 30000; // 30 sec

        if (
            statusChanged ||
            angleDiff > 5 ||
            timeExceeded
        ) {

            lastSavedAngle.current =
                currentAngle;

            lastSavedStatus.current =
                currentStatus;

            lastSaveTime.current =
                now;

            return true;
        }

        return false;
    }

    useEffect(() => {

        let currentAngle = 0;
        let currentStatus = "GOOD";
        let currentScore = 0;
        let currentShoulderDrop = 0;

        async function startCamera() {

            try {

                const stream =
                    await navigator.mediaDevices.getUserMedia({
                        video: true
                    });

                videoRef.current.srcObject =
                    stream;

                const pose = createPose((results) => {

                    if (
                        !results.poseLandmarks
                    ) return;

                    const lm =
                        results.poseLandmarks;

                    const leftEar =
                        lm[7];

                    const rightEar =
                        lm[8];

                    const leftShoulder =
                        lm[11];

                    const rightShoulder =
                        lm[12];

                    const leftHip =
                        lm[23];

                    const rightHip =
                        lm[24];

                    const earMid = {

                        x:
                            (
                                leftEar.x +
                                rightEar.x
                            ) / 2,

                        y:
                            (
                                leftEar.y +
                                rightEar.y
                            ) / 2

                    };

                    const shoulderMid = {

                        x:
                            (
                                leftShoulder.x +
                                rightShoulder.x
                            ) / 2,

                        y:
                            (
                                leftShoulder.y +
                                rightShoulder.y
                            ) / 2

                    };

                    const hipMid = {

                        x:
                            (
                                leftHip.x +
                                rightHip.x
                            ) / 2,

                        y:
                            (
                                leftHip.y +
                                rightHip.y
                            ) / 2

                    };

                    currentAngle =
                        calculateAngle(
                            earMid,
                            shoulderMid,
                            hipMid
                        );

                    currentShoulderDrop =
                        Math.abs(
                            leftShoulder.y -
                            rightShoulder.y
                        );

                    currentStatus =
                        classifyPosture(
                            currentAngle,
                            currentShoulderDrop
                        );

                    currentScore =
                        updateScore(
                            currentStatus
                        );

                    setAngle(
                        currentAngle.toFixed(2)
                    );

                    setStatus(
                        currentStatus
                    );

                    setScore(
                        currentScore
                    );

                });

                const canvas =
                    document.createElement(
                        "canvas"
                    );

                const ctx =
                    canvas.getContext(
                        "2d"
                    );

                // MediaPipe Processing
                setInterval(async () => {

                    if (
                        !videoRef.current
                    ) return;

                    canvas.width =
                        videoRef.current.videoWidth;

                    canvas.height =
                        videoRef.current.videoHeight;

                    ctx.drawImage(
                        videoRef.current,
                        0,
                        0
                    );

                    await pose.send({
                        image: canvas
                    });

                }, 100);

                // Save Logic
                setInterval(async () => {

                    if (
                        shouldSave(
                            currentAngle,
                            currentStatus
                        )
                    ) {

                        await savePostureData({

                            sessionId:
                                "SESSION001",

                            neckAngle:
                                currentAngle,

                            shoulderDrop:
                                currentShoulderDrop,

                            postureStatus:
                                currentStatus,

                            score:
                                currentScore

                        });

                        console.log(
                            "Saved",
                            currentStatus,
                            currentAngle
                        );

                    }
                    else {

                        console.log(
                            "Skipped Duplicate"
                        );

                    }

                }, 5000);

            }
            catch (error) {

                console.log(
                    error
                );

            }

        }

        startCamera();

    }, []);

    return (

        <div
            style={{
                textAlign: "center"
            }}
        >

            <h1>
                PostureQuest AI
            </h1>

            <video
                ref={videoRef}
                autoPlay
                playsInline
                width="700"
            />

            <h2>
                Neck Angle:
                {" "}
                {angle}
            </h2>

            <h2>
                Status:
                {" "}
                {status}
            </h2>

            <h2>
                Score:
                {" "}
                {score}
            </h2>

        </div>

    );

}

export default LiveMonitor;
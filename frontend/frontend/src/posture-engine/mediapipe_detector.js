export function createPose(callback) {

    const pose = new window.Pose({

        locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`

    });

    pose.setOptions({

        modelComplexity: 0,

        smoothLandmarks: true,

        minDetectionConfidence: 0.5,

        minTrackingConfidence: 0.5

    });

    pose.onResults(callback);

    return pose;

}
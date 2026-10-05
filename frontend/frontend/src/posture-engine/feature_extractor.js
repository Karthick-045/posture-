import {
    getSessionStats
}
from "../../session_tracker.js";

export function extractFeatures(
    neckAngle,
    shoulderDrop,
    postureStatus,
    score
) {

    const session =
        getSessionStats();

    return {

        sessionId:
            crypto.randomUUID(),

        neckAngle,

        shoulderDrop,

        postureStatus,

        score,

        sessionDuration:
            session.sessionDuration,

        goodTime:
            session.goodTime,

        badTime:
            session.badTime
    };
}
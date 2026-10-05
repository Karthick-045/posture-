let sessionStart = Date.now();

let goodTime = 0;

let badTime = 0;

let lastUpdate = Date.now();

export function updateSession(
    postureStatus
) {

    const now = Date.now();

    const elapsed =
        (now - lastUpdate) / 1000;

    if(postureStatus === "GOOD") {

        goodTime += elapsed;

    } else {

        badTime += elapsed;

    }

    lastUpdate = now;
}

export function getSessionStats() {

    return {

        sessionDuration:
            Math.floor(
                (Date.now() - sessionStart)
                / 1000
            ),

        goodTime,

        badTime
    };
}
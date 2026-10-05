let score = 0;

export function updateScore(
    postureStatus
) {

    if (
        postureStatus === "GOOD"
    ) {

        score += 1;

    } else {

        score -= 1;

    }

    return score;

}

export function getScore() {

    return score;

}
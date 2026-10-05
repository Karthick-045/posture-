export function classifyPosture(
    neckAngle,
    shoulderDrop
) {

    if (
        neckAngle < 160 ||
        shoulderDrop > 0.05
    ) {

        return "BAD";

    }

    return "GOOD";

}
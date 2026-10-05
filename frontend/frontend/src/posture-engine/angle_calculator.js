export function calculateAngle(A, B, C) {

    const AB = {
        x: B.x - A.x,
        y: B.y - A.y
    };

    const CB = {
        x: B.x - C.x,
        y: B.y - C.y
    };

    const dot =
        AB.x * CB.x +
        AB.y * CB.y;

    const magAB =
        Math.sqrt(
            AB.x * AB.x +
            AB.y * AB.y
        );

    const magCB =
        Math.sqrt(
            CB.x * CB.x +
            CB.y * CB.y
        );

    const angle =
        Math.acos(
            dot /
            (magAB * magCB)
        );

    return (
        angle *
        180 /
        Math.PI
    );

}
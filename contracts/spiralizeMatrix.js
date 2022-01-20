export async function spiralizeMatrix(ns, arrayData) {
    let i, j;

    let arrayY = arrayData.length;
    let arrayX = arrayData[0].length;

    let loopCount = Math.ceil(arrayX / 2) + 1;
    let marginData = [0, 1, 1, 0];

    let resultData = [];

    let lastWaypoint = [0, 0];

    resultData[0] = arrayData[0][0];

    for (i = 0; i < loopCount; i++) {
        if (marginData[0] + marginData[2] <= arrayY && marginData[1] + marginData[3] <= arrayX) {
            for (j = lastWaypoint[1] + 1; j <= arrayX - marginData[1]; j++) {
                resultData[resultData.length] = arrayData[lastWaypoint[0]][j];
            }

            lastWaypoint = [0 + marginData[0], arrayX - marginData[1]];
            marginData[0] += 1;
        }
        if (marginData[0] + marginData[2] <= arrayY && marginData[1] + marginData[3] <= arrayX) {
            for (j = lastWaypoint[0] + 1; j <= arrayY - marginData[2]; j++) {
                resultData[resultData.length] = arrayData[j][lastWaypoint[1]];
            }

            lastWaypoint = [arrayY - marginData[2], arrayX - marginData[1]];
            marginData[1] += 1;
        }
        if (marginData[0] + marginData[2] <= arrayY && marginData[1] + marginData[3] <= arrayX) {
            for (j = lastWaypoint[1] - 1; j >= 0 + marginData[3]; j--) {
                resultData[resultData.length] = arrayData[lastWaypoint[0]][j];
            }

            lastWaypoint = [arrayY - marginData[2], 0 + marginData[3]];
            marginData[2] += 1;
        }
        if (marginData[0] + marginData[2] <= arrayY && marginData[1] + marginData[3] <= arrayX) {
            for (j = lastWaypoint[0] - 1; j >= 0 + marginData[0]; j--) {
                resultData[resultData.length] = arrayData[j][lastWaypoint[1]];
            }

            lastWaypoint = [0 + marginData[0], 0 + marginData[3]];
            marginData[3] += 1;
        }
    }

    return JSON.stringify(resultData);
}
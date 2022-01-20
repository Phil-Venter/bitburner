export async function trianglePath(ns, arrayData) {
    let i, j;

    for (i = 1; i < arrayData.length; i++) {
        for (j = 0; j < arrayData[i].length; j++) {
            arrayData[i][j] += Math.min(arrayData[i - 1][Math.max(0, j - 1)], arrayData[i - 1][Math.min(j, arrayData[i - 1].length - 1)]);
        }
    }

    let finalRow = arrayData[arrayData.length - 1];
    let finalMinimum = 999;
    for (i = 0; i < finalRow.length; i++) {
        finalMinimum = Math.min(finalMinimum, finalRow[i]);
    }

    return finalMinimum;
}
export async function mergeRanges(ns, arrayData) {
    let i, j, k;
    let rangeMax = 0;
    let rangeMin = 999;
    let outputRanges = [];

    for (i = 0; i < arrayData.length; i++) {
        rangeMin = Math.min(rangeMin, arrayData[i][0]);
        rangeMax = Math.max(rangeMax, arrayData[i][1]);
    }

    let activeRange = 0;
    let startRange, inRange;

    for (i = rangeMin; i <= rangeMax + 1; i++) {
        inRange = 0;

        for (j = 0; j < arrayData.length; j++) {
            if (i >= arrayData[j][0] && i < arrayData[j][1]) {
                inRange = 1;

                if (activeRange === 0) {
                    activeRange = 1;
                    startRange = i;
                }
            }
        }

        if (activeRange === 1 && inRange === 0) {
            activeRange = 0;
            outputRanges[outputRanges.length] = [startRange, i];
        }
    }

    return JSON.stringify(outputRanges);
}
export async function uniquePathsII(ns, arrayData) {
    let i, j, k;
    let pathsTo = [];
    for (i = 0; i < arrayData.length; i++) {
        pathsTo[i] = [];
        for (j = 0; j < arrayData[0].length; j++) {
            pathsTo[i][j] = 0;
        }
    }
    pathsTo[0][0] = 1;

    for (i = 0; i < arrayData.length; i++) {
        for (j = 0; j < arrayData[0].length; j++) {
            if (i > 0 && j > 0 && !arrayData[i][j]) {
                pathsTo[i][j] = pathsTo[i][j - 1] + pathsTo[i - 1][j];
            } else if (i > 0 && !arrayData[i][j]) {
                pathsTo[i][j] = pathsTo[i - 1][j];
            } else if (j > 0 && !arrayData[i][j]) {
                pathsTo[i][j] = pathsTo[i][j - 1];
            } else if (i === 0 && j === 0 && !arrayData[i][j]) {
                pathsTo[0][0] = 1;
            } else {
                pathsTo[i][j] = 0;
            }
        }
    }

    return pathsTo[pathsTo.length - 1][pathsTo[0].length - 1];
}
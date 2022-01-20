export async function stockTrader(ns, arrayData) {
    let i, j, k;

    let tempStr = "[0";
    for (i = 0; i < arrayData[1].length; i++) {
        tempStr += ",0";
    }
    tempStr += "]";
    let tempArr = "[" + tempStr;
    for (i = 0; i < arrayData[0] - 1; i++) {
        tempArr += "," + tempStr;
    }
    tempArr += "]";

    let highestProfit = JSON.parse(tempArr);

    for (i = 0; i < arrayData[0]; i++) {
        for (j = 0; j < arrayData[1].length; j++) { // Buy / Start
            for (k = j; k < arrayData[1].length; k++) { // Sell / End
                if (i > 0 && j > 0 && k > 0) {
                    highestProfit[i][k] = Math.max(highestProfit[i][k], highestProfit[i - 1][k], highestProfit[i][k - 1], highestProfit[i - 1][j - 1] + arrayData[1][k] - arrayData[1][j]);
                } else if (i > 0 && j > 0) {
                    highestProfit[i][k] = Math.max(highestProfit[i][k], highestProfit[i - 1][k], highestProfit[i - 1][j - 1] + arrayData[1][k] - arrayData[1][j]);
                } else if (i > 0 && k > 0) {
                    highestProfit[i][k] = Math.max(highestProfit[i][k], highestProfit[i - 1][k], highestProfit[i][k - 1], arrayData[1][k] - arrayData[1][j]);
                } else if (j > 0 && k > 0) {
                    highestProfit[i][k] = Math.max(highestProfit[i][k], highestProfit[i][k - 1], arrayData[1][k] - arrayData[1][j]);
                } else {
                    highestProfit[i][k] = Math.max(highestProfit[i][k], arrayData[1][k] - arrayData[1][j]);
                }
            }
        }
    }
    return highestProfit[arrayData[0] - 1][arrayData[1].length - 1];
}
export async function arrayJumpingGame(ns, arrayData) {
    let arrayJump = [1];

    for (let n = 0; n < arrayData.length; n++) {
        if (arrayJump[n]) {
            for (let p = n; p <= Math.min(n + arrayData[n], arrayData.length-1); p++) {
                arrayJump[p] = 1;
            }
        }
    }

    return 0 + Boolean(arrayJump[arrayData.length - 1]);
}
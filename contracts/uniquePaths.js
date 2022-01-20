export async function uniquePaths(ns, arrayData) {
    let k = arrayData[0] - 1; // k
    let ak = arrayData[1] - 1; // n-k
    let n = k + ak; // n = k + (n-k);

    // n choose k = n!/[(k)!(n-k)!] = n! / k! / (n-k)!

    let i;
    let factN = 1,
        factAK = 1;

    for (i = n; i > k; i--) { // n!/k! = n * n-1 * n-2 ... k+1
        factN = factN * i;
    }
    for (i = ak; i > 1; i--) {
        factAK = factAK * i;
    }

    return (factN / factAK);
}
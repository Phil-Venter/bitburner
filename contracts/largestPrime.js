export async function largestPrime(ns, arrayData) {
    let primeFound = 0;

    while (!primeFound) {
        primeFound = 1;
        for (let i = 2; i < Math.sqrt(arrayData); i++) {
            if (!Boolean((arrayData / i) - Math.floor(arrayData / i))) {
                arrayData = arrayData / i;
                primeFound = 0;
            }
        }
    }

    return arrayData;
}
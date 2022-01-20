export async function generateIPs(ns, arrayData) {
    let i, j, k, l;

    let arrayDigits = [];
    let arrayDelim = [];
    for (i = 0; i < arrayData.length; i++) {
        arrayDigits[i] = arrayData.substring(i, i + 1);
        arrayDelim[i] = "";
    }

    let validCandidates = [];

    for (i = 0; i < arrayData.length - 3; i++) {
        for (j = i + 1; j < arrayData.length - 2; j++) {
            for (k = j + 1; k < arrayData.length - 1; k++) {
                let arrayDelimScratch = JSON.parse(JSON.stringify(arrayDelim));
                arrayDelimScratch[i] = ".";
                arrayDelimScratch[j] = ".";
                arrayDelimScratch[k] = ".";

                let candidateAddress = "";
                for (l = 0; l < arrayData.length; l++) {
                    candidateAddress = candidateAddress + arrayDigits[l] + arrayDelimScratch[l];
                }

                let isValid = 1;
                for (l = 0; l < 4; l++) {
                    let tempOctet = candidateAddress.split(".")[l];
                    if (tempOctet.slice(0, 1) === "0") { isValid = 0; }
                    if (parseInt(tempOctet) > 255) { isValid = 0; }
                }
                if (isValid) {
                    validCandidates[validCandidates.length] = candidateAddress;
                }
            }
        }
    }

    let tempStr = JSON.stringify(validCandidates);
    return tempStr.replace(/\"/g, '');
}
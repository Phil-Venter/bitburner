import { allServers } from '/utils/allServers.js';
import { arrayJumpingGame } from '/contracts/arrayJumpingGame.js';
import { generateIPs } from '/contracts/generateIPs.js';
import { largestPrime } from '/contracts/largestPrime.js';
import { largestSubset } from '/contracts/largestSubset.js';
import { mergeRanges } from '/contracts/mergeRanges.js';
import { spiralizeMatrix } from '/contracts/spiralizeMatrix.js';
import { stockTrader } from '/contracts/stockTrader.js';
import { trianglePath } from '/contracts/trianglePath.js';
import { uniquePaths } from '/contracts/uniquePaths.js';
import { uniquePathsII } from '/contracts/uniquePathsII.js';
import { waysToExpress } from '/contracts/waysToExpress.js';
import { waysToSum } from '/contracts/waysToSum.js';

export async function main(ns) {
    let listServers = await allServers(ns);
    let listIndex = 0;

    ns.tprint("Completed server probe; now solving contracts");

    while (true) {
        listIndex = (listIndex + 1) % listServers.length;

        let listFiles = ns.ls(listServers[listIndex], ".cct");

        for (let z = 0; z < listFiles.length; z++) {
            let inputData = ns.codingcontract.getData(listFiles[z], listServers[listIndex]);
            let inputType = ns.codingcontract.getContractType(listFiles[z], listServers[listIndex]);
            let outputData;
            let outputResult = null;

            switch (inputType) {
                case "Algorithmic Stock Trader I":
                    if(inputData.length > 1)voutputData = await solverStockTrader(ns, [1, inputData]);
                    else outputData = 0;
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                case "Algorithmic Stock Trader II":
                    if(inputData.length > 1) outputData = await solverStockTrader(ns, [Math.floor(inputData.length / 2), inputData]);
                    else outputData = 0;
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                case "Algorithmic Stock Trader III":
                    if(inputData.length > 1) outputData = await solverStockTrader(ns, [2, inputData]);
                    else outputData = 0;
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                case "Algorithmic Stock Trader IV":
                    outputData = await solverStockTrader(ns, inputData);
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                case "Array Jumping Game":
                    outputData = await solverArrayJumpingGame(ns, inputData);
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                case "Find All Valid Math Expressions":
                    outputData = await solverWaysToExpress(ns, inputData);
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                case "Find Largest Prime Factor":
                    outputData = await solverLargestPrime(ns, inputData);
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                case "Generate IP Addresses":
                    outputData = await solverGenerateIPs(ns, inputData);
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                case "Merge Overlapping Intervals":
                    outputData = await solverMergeRanges(ns, inputData);
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                case "Minimum Path Sum in a Triangle":
                    outputData = await solverTrianglePath(ns, inputData);
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                case "Spiralize Matrix":
                    outputData = await solverSpiralizeMatrix(ns, inputData);
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                case "Subarray with Maximum Sum":
                    outputData = await solverLargestSubset(ns, inputData);
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                case "Total Ways to Sum":
                    outputData = await solverWaysToSum(ns, inputData);
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                case "Unique Paths in a Grid I":
                    outputData = await solverUniquePaths(ns, inputData);
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                case "Unique Paths in a Grid II":
                    outputData = await solverUniquePathsII(ns, inputData);
                    outputResult = ns.codingcontract.attempt(outputData, listFiles[z], listServers[listIndex]);
                    break;
                default:
                    ns.tprint([listServers[listIndex],
                        listFiles[z],
                        inputType,
                        "NO SOLVER YET"
                    ]);
                    break;
            }


            if (!outputResult) {
                ns.tprint("Failed data for debug: " + JSON.stringify(inputData));
            } else {
                ns.tprint([listServers[listIndex],
                    listFiles[z],
                    inputType,
                    outputData,
                    outputResult
                ]);
            }

            ns.await(1000);
        }
    }
}
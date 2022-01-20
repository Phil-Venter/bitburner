const rootUrl = 'https://raw.githubusercontent.com/Phil-Venter/bitburner/main/';

export async function main(ns) {
  let filesImported = await importFiles(ns);
  ns.tprint('='.repeat(20));
  if (filesImported) {
    ns.tprint('Hey! Thank you for downloading the BitBurner Scripts.');
  } else {
    ns.tprint('You had some issues downloading files, please reach out to the repo maintainer or check your config.');
  }
}

async function importFiles(ns) {
  let files = [
    '/config.js',
    '/contracts/arrayJumpingGame.js',
    '/contracts/generateIPs.js',
    '/contracts/largestPrime.js',
    '/contracts/largestSubset.js',
    '/contracts/mergeRanges.js',
    '/contracts/spiralizeMatrix.js',
    '/contracts/stockTrader.js',
    '/contracts/trianglePath.js',
    '/contracts/uniquePaths.js',
    '/contracts/uniquePathsII.js',
    '/contracts/waysToExpress.js',
    '/contracts/waysToSum.js',
    '/scripts/allServers.js',
    '/scripts/autoBuyServers.js',
    '/scripts/autoContracts.js',
    '/scripts/autoHacknet.js',
    '/scripts/autoServerHack.js',
    '/scripts/autoTargetHack.js',
    '/scripts/findServer.js',
    '/scripts/getAllLit.js',
    '/scripts/rootServers.js',
    '/utils/allServers.js',
    '/utils/calculateMoney.js',
    '/utils/calculateSecurity.js',
    '/utils/copyFiles.js',
    '/utils/rootServers.js',
  ];

  let filesImported = true;
  for (let file of files) {
    let result = await ns.wget(`${rootUrl}${file}`, file);
    filesImported = filesImported && result;
    ns.tprint(`File: ${file}: ${result ? '✔️' : '❌'}`);
  }

  return filesImported;
}
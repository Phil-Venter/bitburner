export async function copyFiles(ns, servers, files) {
	for (let server of servers) {
		await ns.scp(files, ns.getHostname(), server);
	}
}
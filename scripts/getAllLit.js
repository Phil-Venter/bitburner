import { allServers } from '/utils/allServers.js'

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("ALL");

	const host = ns.getHostname();
	const servers = await allServers(ns, host);

	for (let server of servers) {
		const lit = ns.ls(server, '.lit');
		const txt = ns.ls(server, '.txt');

		if (lit.length > 0) { await ns.scp(lit, server, host); }
		if (txt.length > 0) { await ns.scp(txt, server, host); }
	}
}
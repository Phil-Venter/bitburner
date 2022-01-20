import { allServers } from '/utils/allServers.js';

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('ALL');
	ns.tail();

	const host = ns.getHostname();
	const servers = await allServers(ns, host);

	ns.print(servers);
}
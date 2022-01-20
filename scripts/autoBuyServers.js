import { config } from '/config.js';

/** @param {NS} ns **/
export async function main(ns) {
	ns.tail();

	const money = ns.getPlayer().money;
	const limit = ns.getPurchasedServerLimit();

	const spend = money / limit;

	let size = config.serverMinSize;
	let cost = ns.getPurchasedServerCost(size);

	do {
		size *= 2
		cost = ns.getPurchasedServerCost(size)
	} while (spend > cost)

	size /= 2
	cost = ns.getPurchasedServerCost(size)

	if (size < config.serverMinSize) {
		ns.tprint(`get at least ${ns.nFormat(cost * limit, '0.0a')}`)
	}

	const servers = ns.getPurchasedServers()

	for (let i = 0; i < limit; i++) {
		const name = `${config.serverPrefix}-${i}`;

		if (servers.includes(name)) {
			if (ns.getServerMaxRam(name) < size) {
				ns.killall(name);
				ns.deleteServer(name);
				ns.purchaseServer(name, size);
			}
		} else {
			ns.purchaseServer(name, size);
		}
	}
}
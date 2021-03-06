import { config } from '/config.js';
import { allServers } from '/utils/allServers.js'
import { calculateMoney } from '/utils/calculateMoney.js'
import { calculateSecurity } from '/utils/calculateSecurity.js'
import { copyFiles } from '/utils/copyFiles.js'
import { rootServers } from '/utils/rootServers.js'

const _grow = config.grow;
const _hack = config.hack;
const _weaken = config.weaken;
const minSecurityOffset = config.minSecurityOffset;
const maxMoneyOffset = config.maxMoneyOffset;

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("ALL");
	ns.tail();

	const delayTime = ns.args[0] || 1000;

	const host = ns.getHostname();
	const servers = await allServers(ns, host, []);

	while (true) {
		const rootedServers = await rootServers(ns, servers);
		await copyFiles(ns, rootedServers, [_grow, _hack, _weaken]);

		for (let server of rootedServers) {
			if (ns.getServerUsedRam(server) > 0) { continue; }

			const { minSecurity, security } = calculateSecurity(ns, server);
			const { maxMoney, money } = calculateMoney(ns, server);

			const threads = Math.floor(ns.getServerMaxRam(server) / 1.75);

			let script = _hack;
			if (security > minSecurity + minSecurityOffset) {
				script = _weaken;
			} else if (money < maxMoney * maxMoneyOffset) {
				script = _grow;
			}

			ns.exec(script, server, threads, server);

			ns.print(`🏃 ${script} [${server}] (${server})`);
		}

		await ns.sleep(delayTime);
	}
}
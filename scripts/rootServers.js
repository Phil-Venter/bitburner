import { rootServers } from '/utils/rootServers.js';

const schema = [
	['ram', false],
	['money', false],
];

/** @param {NS} ns **/
export async function main(ns) {
	const { _, ram, money } = ns.flags(schema);

	ns.disableLog('ALL');
	ns.tail();

	const rooted = await rootServers(ns, _, { ram, money });

	ns.tprint({_, ram, money, rooted});
}

export function autocomplete(data, args) {
    return [...data.servers, ...schema.map(_ => `--${_[0]}`)];
}
export async function allServers(ns, host, found = []) {
	const servers = await ns.scan(host);

	for (let server of servers) {
		if (found.includes(server)) { continue; }

		found.push(server);

		const subServers = await allServers(ns, server, found);
		found.push(...subServers);
	}

	return [... new Set(found)];
}
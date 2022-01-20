async function calculateSecurity(ns, server) {
	return [ns.getServerMinSecurityLevel(server), ns.getServerSecurityLevel(server)];
}
export async function calculateSecurity(ns, server) {
	return {
		minSecurity: ns.getServerMinSecurityLevel(server),
		security: ns.getServerSecurityLevel(server),
	};
}
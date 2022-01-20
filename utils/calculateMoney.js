async function calculateMoney(ns, server) {
	return [ns.getServerMaxMoney(server), ns.getServerMoneyAvailable(server)];
}
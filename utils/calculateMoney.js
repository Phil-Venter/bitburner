export async function calculateMoney(ns, server) {
	return {
		money: ns.getServerMoneyAvailable(server),
		maxMoney: ns.getServerMaxMoney(server),
	};
}
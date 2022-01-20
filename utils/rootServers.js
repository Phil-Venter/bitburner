import { config } from '/config.js';

const _brutessh = config.brutessh;
const _ftpcrack = config.ftpcrack;
const _httpworm = config.httpworm;
const _relaysmtp = config.relaysmtp;
const _sqlinject = config.sqlinject;

export async function rootServers(ns, servers, include = {}) {
	const hackingLevel = ns.getHackingLevel();

	const hackScripts = [
		_brutessh, _ftpcrack, _relaysmtp, _httpworm, _sqlinject,
	].filter(script => ns.fileExists(script, ns.getHostname()));

	const vulnerableServers = servers.filter((server) => {
		const hostname = ns.getHostname();
		const purchsedServers = ns.getPurchasedServers();
		const rootAccess = ns.hasRootAccess(server);
		const requiredHackingLevel = ns.getServerRequiredHackingLevel(server);
		const portsRequired = ns.getServerNumPortsRequired(server);

		if (hostname === server) return true;
		if (purchsedServers.includes(server)) return false;
		if (rootAccess) return true;
		if (requiredHackingLevel > hackingLevel) return false;
		if (portsRequired > hackScripts.length) return false;

		return true;
	});

	vulnerableServers.forEach((server) => {
		if(hackScripts.includes(_brutessh)) { ns.brutessh(server); }
		if(hackScripts.includes(_ftpcrack)) { ns.ftpcrack(server); }
		if(hackScripts.includes(_relaysmtp)) { ns.relaysmtp(server); }
		if(hackScripts.includes(_httpworm)) { ns.httpworm(server); }
		if(hackScripts.includes(_sqlinject)) { ns.sqlinject(server); }

		ns.nuke(server);
	});

	const { ram, money } = include;

	const minMoney = 0;
	const minRam = 1.75;

	if (ram && money) {
		return vulnerableServers;
	} else if (ram) {
		return vulnerableServers.filter((server) => {
			return ns.getServerMaxMoney(server) > minMoney;
		});
	} else if (ram) {
		return vulnerableServers.filter((server) => {
			return ns.getServerMaxRam(server) > minRam;
		});
	} else {
		return vulnerableServers.filter((server) => {
			return ns.getServerMaxMoney(server) > minMoney
				&& ns.getServerMaxRam(server) > minRam;
		});
	}
}
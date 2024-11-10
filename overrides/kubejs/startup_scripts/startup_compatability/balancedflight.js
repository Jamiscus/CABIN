// Magic Feather but Cooler
if (Platform.isLoaded("balancedflight")) {
	global.itemBlacklist.push("balancedflight:ascended_flight_ring")
	global.itemBlacklist.push("kubejs:incomplete_flight_anchor")

	//Sequence assembly items
	onEvent('item.registry', event => {
		event.create('incomplete_flight_anchor','create:sequenced_assembly').modelJson({parent: 'minecraft:block/beacon'}).displayName('Incomplete Flight Anchor')
	})
}

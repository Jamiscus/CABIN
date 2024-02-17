// Client scripts for addon mods

onEvent('rei.hide.items', event => {
	//Crafts and Additions
	if (Platform.isLoaded("createaddition")) {
		event.hide("thermal:electrum_ingot")
		event.hide("thermal:electrum_nugget")
		event.hide("thermal:electrum_plate")
		event.hide("beyond_earth:iron_stick")
		event.hide("createaddition:zinc_sheet")
		//Unfortunately we have stick to thermal diamond dust due to the strainer recipe
		event.hide("createaddition:diamond_grit")
		event.hide("createaddition:accumulator")
	}
	//The buddycard malum cards are a strange case where we only want to hide items when a mod is not present
	if (!Platform.isLoaded("malum")) {
		event.hide("#buddycardsexp:buddycards_malum")
	}
})
// priority: 9999

// Mod shortcuts
const MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')

const AE2 = (id, x) => MOD("ae2", id, x)
const AL = (id, x) => MOD("alloyed", id, x)
const AP = (id, x) => MOD("architects_palette", id, x)
const BE = (id, x) => MOD("beyond_earth", id, x)
const CD = (id, x) => MOD("createdeco", id, x)
const CR = (id, x) => MOD("create", id, x)
const F = (id, x) => MOD("forge", id, x)
const FA = (id, x) => MOD("forbidden_arcanus", id, x)
const FD = (id, x) => MOD("farmersdelight", id, x)
const EXP = (id, x) => MOD("expcaves", id, x)
const KJ = (id, x) => MOD("kubejs", id, x)
const MC = (id, x) => MOD("minecraft", id, x)
const OC = (id, x) => MOD("occultism", id, x)
const PR_C = (id, x) => MOD("projectred_core", id, x)
const RQ = (id, x) => MOD("reliquary", id, x)
const SP = (id, x) => MOD("supplementaries", id, x)
const TC = (id, x) => MOD("tconstruct", id, x)
const TE = (id, x) => MOD("thermal", id, x)

const colours = ['white', 'orange', 'magenta', 'light_blue', 'lime', 'pink', 'purple', 'light_gray', 'gray', 'cyan', 'brown', 'green', 'blue', 'red', 'black', 'yellow']
const native_metals = ['iron', 'zinc', 'lead', 'copper', 'nickel', 'gold']

const wood_types = [MC('oak'),  MC('spruce'),  MC('birch'),  MC('jungle'),  MC('acacia'),  MC('dark_oak'),  AP('twisted'), TC('greenheart'), TC('skyroot'), TC('bloodshroom'), MC('crimson'), MC('warped'), FA('fungyss'), FA('cherrywood'), FA('mysterywood'), FA('edelwood')]

//None of the modded axes are registered for some reason
const unregistered_axes = ["ae2:certus_quartz_axe", "ae2:nether_quartz_axe", "ae2:fluix_axe", "tconstruct:hand_axe", "tconstruct:mattock", "tconstruct:broad_axe", "thermal:flux_saw", "forbidden_arcanus:draco_arcanus_axe", "forbidden_arcanus:arcane_golden_axe", "forbidden_arcanus:reinforced_arcane_golden_axe", "alloyed:steel_axe"]

const donutCraft = (event, output, center, ring) => {
	return event.shaped(output, [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: center,
		S: ring
	})
}


/**
 * Used to make smithing/mechanical crafting recipes which are common in A&B.
 * If the fourth parameter is excluded, then a stonecutting recipe will be created instead.
 * 
 * First parmeter is the "base" ingredient,
 * third parameter is the output,
 * fourth parameter is the secondary ingredient.
 * 
 * @param {ItemStackJS|string} machineItem 
 * @param {RecipeEventJS} event 
 * @param {ItemStackJS|string} outputIngredient 
 * @param {ItemStackJS|string} inputIngredient 
 */
//event is the second parameter so that machineItem doesn't look like it's the output item
const createMachine = (machineItem, event, outputIngredient, inputIngredient) => {
	event.remove({ output: outputIngredient })
	if (inputIngredient) {
		event.smithing(outputIngredient, machineItem, inputIngredient)
		event.recipes.createMechanicalCrafting(outputIngredient, 'AB', { A: machineItem, B: inputIngredient })
	}
	else
		event.stonecutting(outputIngredient, machineItem)
}

const andesiteMachine = (event, outputIngredient, inputIngredient) => {
	return createMachine('kubejs:andesite_machine', event, outputIngredient, inputIngredient)
}

const copperMachine = (event, outputIngredient, inputIngredient) => {
	return createMachine('kubejs:copper_machine', event, outputIngredient, inputIngredient)
}

const goldMachine = (event, outputIngredient, inputIngredient) => {
	return createMachine('kubejs:gold_machine', event, outputIngredient, inputIngredient)
}

const brassMachine = (event, outputIngredient, inputIngredient) => {
	return createMachine('kubejs:brass_machine', event, outputIngredient, inputIngredient)
}

const zincMachine = (event, outputIngredient, inputIngredient) => {
	return createMachine('kubejs:zinc_machine', event, outputIngredient, inputIngredient)
}

const invarMachine = (event, outputIngredient, inputIngredient) => {
	return createMachine('thermal:machine_frame', event, outputIngredient, inputIngredient)
}

const enderiumMachine = (event, outputIngredient, inputIngredient) => {
	return createMachine('kubejs:enderium_machine', event, outputIngredient, inputIngredient)
}

const fluixMachine = (event, outputIngredient, inputIngredient) => {
	return createMachine('ae2:controller', event, outputIngredient, inputIngredient)
}

const addTreeOutput = (event, trunk, leaf, fluid) => {
	event.custom({
		"type": "thermal:tree_extractor",
		"trunk": trunk,
		"leaves": leaf,
		"result": fluid || {
			"fluid": "thermal:resin",
			"amount": 25
		}
	})
}

const addChiselingRecipe = (event, id, items, overwrite) => {
	const json = {
		type: "rechiseled:chiseling",
		entries: [],
		overwrite: !!overwrite
	}
	items.forEach(item=>{
		json.entries.push({
			item: item
		})
	})
	event.addJson(id, json)
}
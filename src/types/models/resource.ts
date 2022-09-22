export interface IResource {
	id: number;
	name: string;
	craftable: boolean;
	type: 'crafting' | 'smelting';
	igredients: null | Array<string>;
	outputQuantity: number;
	iconUrl: string;
}

export interface IBlock extends IResource {
	category: 'natural' | 'biota' | 'building' | 'utility';
	subCategory:
		| 'soil'
		| 'stone'
		| 'ore'
		| 'liquid'
		| 'wood'
		| 'plant'
		| 'fungus'
		| 'fauna'
		| 'faunal product'
		| 'algae'
		| 'ornamental'
		| 'mineral'
		| 'structural'
		| 'lighting'
		| 'interactable'
		| 'utilizable'
		| 'mechanical';
}

export interface IItem extends IResource {
	category:
		| 'raw materials'
		| 'processed'
		| 'seeds'
		| 'food'
		| 'dyes'
		| 'tools'
		| 'weapons'
		| 'armor'
		| 'informationa'
		| 'vehicles'
		| 'utility'
		| 'aesthetic';
}

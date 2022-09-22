import resources from 'config/resources.json';
import { IBlock, IItem } from 'types/models/resource';

/**
 *
 * @param igredients The list of igredients' names that are making a resource
 * @param currentResource The current resource to check
 * @returns A list of all the clean igredients along with their info
 */
export const searchResource = (igredients: Array<string>, currentResource: IBlock | IItem) => {
	const igredientArray = [];

	// For each igredient find the right match inside the list of resources
	for (let i = 0; i < igredients.length; i++) {
		// Init the array of all the items of a specific category
		let arrayOfItems;
		// Check if resource is block or item
		if (currentResource.sector === 'blocks') {
			// @ts-ignore
			arrayOfItems = resources[currentResource.sector][0][currentResource.category][0][currentResource.subCategory];
		} else {
			arrayOfItems = resources[currentResource.sector][0][currentResource.category];
		}

		// Check if resource is a match with the global list
		const match = arrayOfItems.find((s) => {
			return s.name === igredients[i];
		});

		// Push resources inside the igredients
		igredientArray.push(match);
	}

	// Strip igredients from undefined values
	const cleanIgredients = igredientArray.map((m) => {
		return !m ? '0' : m;
	});

	return cleanIgredients;
};

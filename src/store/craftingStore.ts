import { IBlock, IItem } from 'types/models/resource';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface craftingStoreState {
	coordinates: Array<IItem | IBlock>;
	changeCoordinates: (option: Array<IItem | IBlock>) => void;
}

export const useCraftingStore = create<craftingStoreState>()(
	devtools(
		persist(
			(set) => {
				const initialStore = {
					id: 0,
					name: '',
					craftable: false,
					type: 'crafting' as 'crafting',
					igredients: null,
					outputQuantity: 0,
					iconUrl: '',
					category: 'natural' as 'natural',
					subCategory: 'soil' as 'soil'
				};

				return {
					coordinates: [initialStore],
					changeCoordinates: (option: Array<IItem | IBlock>) => {
						return set(() => {
							return {
								coordinates: option
							};
						});
					}
				};
			},
			{
				name: 'crafting-store'
			}
		)
	)
);

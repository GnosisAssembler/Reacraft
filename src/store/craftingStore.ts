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
				return {
					coordinates: null,
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

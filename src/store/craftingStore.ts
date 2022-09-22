import { IBlock, IItem } from 'types/models/resource';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface craftingStoreState {
	coordinates: Array<IItem | IBlock>;
	output: IItem | IBlock;
	changeCoordinates: (option: Array<IItem | IBlock>) => void;
	setOutput: (option: IItem | IBlock) => void;
}

export const useCraftingStore = create<craftingStoreState>()(
	devtools(
		persist(
			(set) => {
				return {
					coordinates: null,
					output: null,
					changeCoordinates: (option: Array<IItem | IBlock>) => {
						return set(() => {
							return {
								coordinates: option
							};
						});
					},
					setOutput: (option: IItem | IBlock) => {
						return set(() => {
							return {
								output: option
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

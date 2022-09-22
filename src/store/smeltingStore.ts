import { ISmelting } from 'types/models/smelting';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface smeltingStoreState {
	furnace: ISmelting;
	changeFurnace: (option: ISmelting) => void;
}

export const useSmeltingStore = create<smeltingStoreState>()(
	devtools(
		persist(
			(set) => {
				return {
					furnace: null,
					changeFurnace: (option: ISmelting) => {
						return set(() => {
							return {
								furnace: option
							};
						});
					}
				};
			},
			{
				name: 'smelting-store'
			}
		)
	)
);

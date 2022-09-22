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
				const initialState = {
					fuel: 'coal' as 'coal',
					output: ''
				};

				return {
					furnace: initialState,
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

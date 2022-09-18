import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreState {
	test: string;
	changeTest: (option: string) => void;
}

export const useStore = create<StoreState>()(
	devtools(
		persist(
			(set) => {
				return {
					test: 'something here',
					changeTest: (option: string) => {
						return set(() => {
							return {
								test: option
							};
						});
					}
				};
			},
			{
				name: 'test-store'
			}
		)
	)
);

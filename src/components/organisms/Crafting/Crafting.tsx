/* eslint-disable array-callback-return */
/* eslint-disable multiline-ternary */
import Box from 'components/organisms/Box/Box';
import { TiArrowRightOutline } from 'react-icons/ti';
import { useCraftingStore } from 'store/craftingStore';

import styles from './Crafting.module.scss';

const Crafting = () => {
	const craftingStore = useCraftingStore();

	const rows = [1, 2, 3];

	return (
		<div className={styles.wrapper}>
			<div className={styles.rows}>
				{craftingStore.coordinates === null ? (
					rows.map((row) => {
						return (
							<div key={row}>
								{rows.map((box) => {
									return <Box key={box} />;
								})}
							</div>
						);
					})
				) : (
					<>
						<div className={styles.item}>
							{craftingStore.coordinates.map((coordinate, index) => {
								if (index < 3) {
									return <Box key={index} resource={coordinate} />;
								}
							})}
						</div>
						<div className={styles.item}>
							{craftingStore.coordinates.map((coordinate, index) => {
								if (index >= 3 && index <= 5) {
									return <Box key={index} resource={coordinate} />;
								}
							})}
						</div>
						<div className={styles.item}>
							{craftingStore.coordinates.map((coordinate, index) => {
								if (index > 5) {
									return <Box key={index} resource={coordinate} />;
								}
							})}
						</div>
					</>
				)}
			</div>
			<TiArrowRightOutline />
			<Box resource={craftingStore.output} />
		</div>
	);
};

export default Crafting;

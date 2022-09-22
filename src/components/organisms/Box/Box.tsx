import cn from 'classnames';
import { Tooltip } from 'evergreen-ui';
import { useCraftingStore } from 'store/craftingStore';
import { IBlock, IItem } from 'types/models/resource';
import { searchResource } from 'utils/searchHelpers';

import styles from './Box.module.scss';

type BoxProps = {
	resource?: IBlock | IItem;
	className?: string;
};

const Box = ({ resource, className }: BoxProps) => {
	const craftingStore = useCraftingStore();

	const handleCrafting = () => {
		const results = searchResource(resource.igredients, resource);
		craftingStore.changeCoordinates(results);
	};

	const handleSmelting = () => {
		//
	};

	const handleClick = () => {
		if (resource?.type === 'crafting') {
			handleCrafting();
		}
		if (resource?.type === 'smelting') {
			handleSmelting();
		}
	};

	return (
		<div
			className={cn(styles.box, resource?.craftable && styles.clickable, className)}
			onClick={resource?.craftable && handleClick}
		>
			{resource && (
				<Tooltip content={resource?.name}>
					<img src={resource?.iconUrl} alt={resource?.name} />
				</Tooltip>
			)}
		</div>
	);
};

export default Box;

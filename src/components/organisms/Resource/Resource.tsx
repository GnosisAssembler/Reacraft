import cn from 'classnames';
import { Tooltip } from 'evergreen-ui';
import { useCraftingStore } from 'store/craftingStore';
import { useSmeltingStore } from 'store/smeltingStore';
import { IBlock, IItem } from 'types/models/resource';

import styles from './Resource.module.scss';

type ResourceProps = {
	resource?: IBlock | IItem;
	clickable?: boolean;
	className?: string;
};

const Resource = ({ resource, clickable, className }: ResourceProps) => {
	const craftingStore = useCraftingStore();
	const smeltingStore = useSmeltingStore();

	const handleClick = () => {
		//
	};

	return (
		<div className={cn(styles.resource, clickable && styles.clickable, className)} onClick={handleClick}>
			<Tooltip content="resource">
				<img src="" alt="" />
			</Tooltip>
		</div>
	);
};

export default Resource;

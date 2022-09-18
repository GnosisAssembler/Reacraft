import cn from 'classnames';
import { Tooltip } from 'evergreen-ui';

import styles from './Item.module.scss';

type ItemProps = {
	name: string;
	iconUrl: string;
	className?: string;
};

const Item = ({ name, iconUrl, className }: ItemProps) => {
	return (
		<div className={cn(styles.item, className)}>
			<Tooltip content={name}>
				<img src={iconUrl} alt={name} />
			</Tooltip>
		</div>
	);
};

export default Item;

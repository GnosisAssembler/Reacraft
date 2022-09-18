/* eslint-disable array-callback-return */
import cn from 'classnames';
import Item from 'components/molecules/Item/Item';

import styles from './Workbench.module.scss';

type WorkbenchProps = {
	coordinates: Array<{ name: string; iconUrl: string }>;
	className?: string;
};

const Workbench = ({ coordinates, className }: WorkbenchProps) => {
	return (
		<div className={cn(styles.wrapper, className)}>
			<div className={styles.row}>
				{coordinates.map((coordinate, index) => {
					if (index < 3) {
						return <Item key={coordinate.name} name={coordinate.name} iconUrl={coordinate.iconUrl} />;
					}
				})}
			</div>
			<div className={styles.row}>
				{coordinates.map((coordinate, index) => {
					if (index >= 3 && index <= 5) {
						return <Item key={coordinate.name} name={coordinate.name} iconUrl={coordinate.iconUrl} />;
					}
				})}
			</div>
			<div className={styles.row}>
				{coordinates.map((coordinate, index) => {
					if (index > 5) {
						return <Item key={coordinate.name} name={coordinate.name} iconUrl={coordinate.iconUrl} />;
					}
				})}
			</div>
		</div>
	);
};

export default Workbench;

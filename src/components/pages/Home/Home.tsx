import Item from 'components/molecules/Item/Item';

import items from '../../../config/items.json';
import styles from './Home.module.scss';

const Home = () => {
	return (
		<div>
			<h1>Items</h1>
			<div className={styles.items}>
				{items.blocks.map((block) => {
					return <Item key={block.id} name={block.name} iconUrl={block.icon} className={styles.item} />;
				})}
			</div>
		</div>
	);
};
export default Home;

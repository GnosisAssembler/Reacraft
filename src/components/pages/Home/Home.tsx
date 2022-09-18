import Item from 'components/molecules/Item/Item';
import Workbench from 'components/organisms/Workbench/Workbench';

import items from '../../../config/items.json';
import styles from './Home.module.scss';

const Home = () => {
	const mockWorkbench = [
		{
			name: '',
			iconUrl: ''
		},
		{
			name: '',
			iconUrl: ''
		},
		{
			name: '',
			iconUrl: ''
		},
		{
			name: '',
			iconUrl: ''
		},
		{
			name: '',
			iconUrl: ''
		},
		{
			name: '',
			iconUrl: ''
		},
		{
			name: '',
			iconUrl: ''
		},
		{
			name: '',
			iconUrl: ''
		},
		{
			name: '',
			iconUrl: ''
		}
	];

	return (
		<div>
			<h1>Items</h1>
			<Workbench coordinates={mockWorkbench} className={styles.workbench} />
			<div className={styles.items}>
				{items.blocks.map((block) => {
					return <Item key={block.id} name={block.name} iconUrl={block.icon} className={styles.item} />;
				})}
			</div>
		</div>
	);
};
export default Home;

import Box from 'components/organisms/Box/Box';
import Crafting from 'components/organisms/Crafting/Crafting';

import styles from './Overview.module.scss';

const mockResource = {
	name: 'lapis lazulis',
	craftable: true,
	type: 'crafting' as 'crafting',
	igredients: ['0', '0', 'lapis lazulis', '0', '0', 'lapis lazulis', '0', '0', 'lapis lazulis'],
	outputQuantity: 1,
	iconUrl: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/4/43/Lapis_Lazuli_JE2_BE2.png',
	sector: 'blocks' as 'blocks',
	category: 'natural' as 'natural',
	subCategory: 'soil' as 'soil'
};

const Overview = () => {
	return (
		<div>
			<Crafting />
			<br />
			<Box resource={mockResource} />
		</div>
	);
};
export default Overview;

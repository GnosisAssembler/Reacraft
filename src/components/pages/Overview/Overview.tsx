import Box from 'components/organisms/Box/Box';
import Crafting from 'components/organisms/Crafting/Crafting';
import resources from 'config/resources.json';

import styles from './Overview.module.scss';

const Overview = () => {
	return (
		<div>
			<h2>Crafting Table</h2>
			<Crafting />
			<br />
			<h3>Ore Blocks</h3>
			{resources.blocks[0]?.natural[2]?.ore &&
				resources.blocks[0]?.natural[2]?.ore.map((oreResource) => {
					// @ts-ignore
					return <Box key={oreResource?.name} resource={oreResource} />;
				})}
		</div>
	);
};
export default Overview;

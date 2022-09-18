import items from '../../../config/items.json';

const Home = () => {
	return (
		<div>
			<h1>Items</h1>
			{items.blocks.map((block) => {
				return <p key={block.id}>{block.name}</p>;
			})}
		</div>
	);
};
export default Home;

import Home from 'components/pages/Home/Home';
import NotFound from 'components/pages/NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';

const RouteMain = () => {
	return (
		<Routes>
			<Route path="*" element={<NotFound />} />
			<Route path="/" element={<Home />} />
		</Routes>
	);
};

export default RouteMain;

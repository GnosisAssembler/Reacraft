import Overview from 'components/pages/Overview/Overview';
import NotFound from 'components/pages/NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';

const RouteMain = () => {
	return (
		<Routes>
			<Route path="*" element={<NotFound />} />
			<Route path="/" element={<Overview />} />
		</Routes>
	);
};

export default RouteMain;

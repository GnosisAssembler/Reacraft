import { useEffect, useState } from 'react';

import { Alert } from '@mui/material';
import Layout from 'components/templates/Layout/Layout';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import RouteMain from './routes';

const App = () => {
	const navigate = useNavigate();

	const [errorExists, setErrorExists] = useState(false);

	const ErrorFallback = ({ error, resetErrorBoundary }) => {
		// Trigger an error
		setErrorExists((e) => {
			return !e;
		});

		// Reset error state, first things first
		useEffect(() => {
			resetErrorBoundary();
			// Log error
			console.log(error);
		}, []);

		return (
			<Alert severity="error" color="error">
				Something went wrong
			</Alert>
		);
	};

	return (
		<Layout>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				// Reset error state and redirect to Overview
				onReset={() => {
					setErrorExists(false);
					navigate('/');
				}}
				resetKeys={[errorExists]}
			>
				<RouteMain />
			</ErrorBoundary>
		</Layout>
	);
};
export default App;

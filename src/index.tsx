import { StrictMode } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import App from './App';
import { theme } from './theme/theme';

export const queryClient = new QueryClient();

export const history = createBrowserHistory({ window });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<HistoryRouter history={history}>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<App />

					<ReactQueryDevtools />
				</QueryClientProvider>
			</ThemeProvider>
		</HistoryRouter>
	</StrictMode>
);

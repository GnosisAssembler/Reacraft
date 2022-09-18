import { queryClient } from 'index';

export const defaultOptions = (queryKey: string, queryParam?: string) => {
	let placeholder = queryClient.getQueryData<any>(queryKey);
	if (queryParam) {
		placeholder = queryClient.getQueryData<any>(queryKey)?.find((d: any) => {
			return d.id === queryParam;
		});
	}

	return {
		// Set cache time to 30 mins
		cacheTime: 1000 * 60 * 30,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		// Provide placeholder data from the cache
		placeholderData: placeholder
	};
};

export const shortCacheOptions = () => {
	return {
		cacheTime: 1000 * 60 * 1,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false
	};
};

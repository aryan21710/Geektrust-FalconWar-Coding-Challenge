import React, { useEffect } from 'react';
import { FindFalconeUrl } from '../../../lib/myenv';
import { makePostRequestToBackend } from '../../../lib/api';

export const usePostDataToFetchResult = async (
	setBackendResponse,
	backendResponse,
	apiError,
	setApiError,
	dataToFetchFinalResult
) => {
	useEffect(() => {
		console.log(`dataToFetchFinalResult ${JSON.stringify(dataToFetchFinalResult, null, 4)}`);
		const callToBackend = async () => {
			const finalResult = await makePostRequestToBackend(FindFalconeUrl, setApiError, dataToFetchFinalResult);
			const data = finalResult?.data;
			data && console.log(`dataToFetchFinalResult ${JSON.parse(JSON.stringify(data))}`);
			data && setBackendResponse(JSON.parse(JSON.stringify(data)));
		};

		if (Object.keys(backendResponse).length === 0 && Object.keys(apiError).length === 0) callToBackend();
	}, []);
};

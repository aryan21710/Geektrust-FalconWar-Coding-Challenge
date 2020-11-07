import axios from 'axios';
import { FindFalconeUrl } from '../lib/myenv';

export const usePostDataToFetchResult = async (dataToFetchFinalResult, setBackendResponse, backendResponse, setError, error) => {
	if (Object.keys(backendResponse).length === 0 && Object.keys(error).length === 0) {
		try {
			const finalResult = await axios.post(`${FindFalconeUrl}`, dataToFetchFinalResult, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			const { data } = finalResult;
			setBackendResponse(data);
		} catch (err) {
			setError(err);
		}
	}
};

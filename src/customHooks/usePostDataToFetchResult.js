import axios from 'axios';
import { FindFalconeUrl } from '../common/myenv';

export const usePostDataToFetchResult = async (finalData, setBackendResponse, backendResponse, setError, error) => {
	if (Object.keys(backendResponse).length === 0 && Object.keys(error).length === 0) {
		try {
			const finalResult = await axios.post(`${FindFalconeUrl}`, finalData, {
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

import axios from 'axios';
import { defaultAxiosHeader, postDataAxiosHeader } from '../../common/axiosHeaders';

export const makeRequestToBackend = async (url, method, setApiError, body = undefined) => {
	try {
		return await axios(url, {
			method,
			defaultAxiosHeader,
			headers: method === 'POST' && postDataAxiosHeader,
		});
	} catch (err) {
		err?.response && setApiError({
			status: err.response.status,
			data: err.response.data,
			message: err.message,
			response: err.response,
			url: err.response.config.url,
		});
	}
};

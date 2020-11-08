import axios from 'axios';
import { defaultAxiosHeader, postDataAxiosHeader } from './axiosHeaders';

export const makePostRequestToBackend = async (url, setApiError, body = undefined) => {
	try {
		return await axios.post(url, body, {
			headers: postDataAxiosHeader,
		});
	} catch (err) {
		err?.response &&
			setApiError({
				status: err.response.status,
				data: err.response.data,
				message: err.message,
				response: err.response,
				url: err.response.config.url,
			});
	}
};

export const makeGetRequestToBackend = async (url, setApiError) => {
	try {
		return await axios.get(url, {
			defaultAxiosHeader,
		});
	} catch (err) {
		err?.response &&
			setApiError({
				status: err.response.status,
				data: err.response.data,
				message: err.message,
				response: err.response,
				url: err.response.config.url,
			});
	}
};

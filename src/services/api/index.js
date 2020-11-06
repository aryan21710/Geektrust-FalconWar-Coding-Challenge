import axios from 'axios';
import { defaultAxiosHeader, postDataAxiosHeader } from '../../common/axiosHeaders';

export const makeRequestToBackend = async (url, method, body = undefined) => {
	const response = await axios(url, {
		method,
		defaultAxiosHeader,
		headers: method === 'POST' && postDataAxiosHeader,
	});
	return response;
};

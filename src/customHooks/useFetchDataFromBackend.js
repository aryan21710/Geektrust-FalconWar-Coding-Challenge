import axios from 'axios';
import { TokenUrl, PlanetUrl, VehicleUrl } from '../common/myenv';
import { defaultAxiosHeader, postDataAxiosHeader } from '../common/axiosHeaders';

export const useFetchDataFromBackend = async (planetCfg, setPlanetCfg) => {
	const { token, planetData, vehicleData, apiError } = planetCfg;
	if (token.length === 0 && apiError.length === 0 && planetData.length === 0 && vehicleData.length === 0) {
		try {
			const planetApiResponse = await axios(PlanetUrl, defaultAxiosHeader);

			const planetData = planetApiResponse?.data;

			const vehicleApiResponse = await axios(VehicleUrl, defaultAxiosHeader);

			const vehicleData = vehicleApiResponse?.data;

			const tokenApiResponse = await axios(TokenUrl, {
				method: 'POST',
				defaultAxiosHeader,
				headers: postDataAxiosHeader,
			});

			const token = tokenApiResponse?.data?.token;
			if (token && planetData && vehicleData) {
				setPlanetCfg({ ...planetCfg, token, planetData, vehicleData });
			} else {
				setPlanetCfg({ ...planetCfg, apiError: 'ERROR WHILE FETCHING DATA FROM THE BACKEND' });
			}
		} catch (err) {
			if (err?.response?.data) {
				setPlanetCfg({ ...planetCfg, apiError: err.response.data });
			} else {
				setPlanetCfg({ ...planetCfg, apiError: err.message });
			}
		}
	}
};

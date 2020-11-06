import { TokenUrl, PlanetUrl, VehicleUrl } from '../common/myenv';
import { makeRequestToBackend } from '../services/api';
import { SpaceBotImgArr } from '../customHooks/useDefineConstants';

export const useFetchDataFromBackend = async (planetCfg, setPlanetCfg) => {
	if (Object.keys(planetCfg).length === 0) {
		try {
			const response = await Promise.all([
				await makeRequestToBackend(PlanetUrl, 'GET'),
				await makeRequestToBackend(VehicleUrl, 'GET'),
				await makeRequestToBackend(TokenUrl, 'POST'),
			]);
			if (response.length === 3) {
				const vehicleData = response[1]?.data;
				const token = response[2]?.data?.token;
				const planetData = response[0]?.data;
				const updatedVehData = vehicleData.map((data, idx) => ({
					imgName: SpaceBotImgArr[idx],
					name: data.name.toUpperCase(),
					distance: data.max_distance,
					speed: data.speed,
					totalUnits: data.total_no,
				}));
				setPlanetCfg({
					...planetCfg,
					token,
					planetData,
					vehicleData: updatedVehData,
				});
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

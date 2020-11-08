import React, { useEffect } from 'react';
import { TokenUrl, PlanetUrl, VehicleUrl } from '../../lib/myenv';
import { makePostRequestToBackend, makeGetRequestToBackend} from '../../lib/api';
import { SpaceBotImgArr } from '../../lib/constants';

export const useFetchDataFromBackend = async (planetCfg, setPlanetCfg, apiError, setApiError) => {
	useEffect(() => {
		const callToBackend = async () => {
			if (Object.keys(planetCfg).length === 0 && Object.keys(apiError).length === 0) {
				try {
					const response = await Promise.all([
						await makeGetRequestToBackend(PlanetUrl, setApiError),
						await makeGetRequestToBackend(VehicleUrl, setApiError),
						await makePostRequestToBackend(TokenUrl, setApiError),
					]);
					if (response.length === 3) {
						const vehicleData = response[1]?.data;
						const token = response[2]?.data?.token;
						const planetData = response[0]?.data;
						if (vehicleData && token && planetData) {
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
							throw new Error('error');
						}
					}
				} catch (err) {
					setApiError({
						url: '',
						message: 'ERROR WHILE FETCHING DATA FROM THE BACKEND',
					});
				}
			}
		};

		callToBackend();
	}, []);
};

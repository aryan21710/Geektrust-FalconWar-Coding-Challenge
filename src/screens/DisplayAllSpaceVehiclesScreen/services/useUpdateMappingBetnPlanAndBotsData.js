import React, { useEffect } from 'react';
import { MAPPINGBETNPLANETANDBOTSDATA, SpaceBotImgArr } from '../../../lib/constants';

export const useUpdateMappingBetnPlanAndBotsData = (selectedPlanet, setMappingBetnPlanetAndBotsData) => {
	useEffect(() => {
		const planetArr = selectedPlanet.map((_) => _.planetname.toUpperCase());
		const _ = MAPPINGBETNPLANETANDBOTSDATA.filter((data) => planetArr.includes(data.planetname)).map((data) => {
			return {
				...data,
				vehicleDataArray: data.vehicleDataArray.map((vehicleData, idx) => ({
					...vehicleData,
					botImageName: SpaceBotImgArr[idx],
				})),
			};
		});
		console.log(`MAPPINGBETNPLANETANDBOTSDATA ${JSON.stringify(_, null, 4)} `);
		localStorage.setItem('planetAndBotsData', JSON.stringify(_));
		setMappingBetnPlanetAndBotsData(_);
	}, []);
};

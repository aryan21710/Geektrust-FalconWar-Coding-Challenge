import React, { useContext, useState, useEffect } from 'react';
import { Heading, SelectedPlanetWrapper } from './styles';
import { PlanetDetailsContext } from '../../context/appContext';
import { usePostDataToFetchResult } from '../../customHooks/usePostDataToFetchResult';

const DisplayFinalResultScreen = () => {
	const { dataToFetchFinalResult, apiError, setApiError } = useContext(PlanetDetailsContext);
	const [backendResponse, setBackendResponse] = useState({});
	const [displayMessage, setDisplayMessage] = useState('');
	const [vehicleToTravelTimeMapping, setVehicleToTravelTimeMapping] = useState({});

	useEffect(() => {
		const _ = dataToFetchFinalResult?.vehicleToTravelTimeMapping;
		_ && setVehicleToTravelTimeMapping({ ...vehicleToTravelTimeMapping, ..._ });
	}, []);

	usePostDataToFetchResult(setBackendResponse, backendResponse, apiError, setApiError, dataToFetchFinalResult);

	useEffect(() => {
		if (Object.keys(backendResponse).length > 0) {
			const { planet_name } = backendResponse;
			planet_name
				? setDisplayMessage(
						`CONGRATULATIONS . YOU FOUND AL FALCONE ON ${planet_name.toUpperCase()}. TRAVEL TIME ${vehicleToTravelTimeMapping[planet_name]}..`
				  )
				: setDisplayMessage('MISSION FAILED.. KEEP LOOKING FOR AL FALCONE');
		} else {
			apiError.length > 0 && setDisplayMessage('BACKEND REQUEST ERROR.');
		}
		return () => {
			localStorage.clear();
		};
	}, [backendResponse]);

	return (
		<React.Fragment>
			<SelectedPlanetWrapper>
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					{displayMessage.length > 0 && displayMessage}
				</Heading>
			</SelectedPlanetWrapper>
		</React.Fragment>
	);
};

export default DisplayFinalResultScreen;

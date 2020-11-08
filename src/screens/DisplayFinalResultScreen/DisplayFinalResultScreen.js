import React, { useContext, useState, useEffect } from 'react';
import { Heading, SelectedPlanetWrapper } from './styles';
import { PlanetDetailsContext } from '../../context/appContext';
import { usePostDataToFetchResult } from '../../customHooks/usePostDataToFetchResult';

const DisplayFinalResultScreen = () => {
	const { dataToFetchFinalResult, apiError, setApiError } = useContext(PlanetDetailsContext);
	const [backendResponse, setBackendResponse] = useState({});
	const [displayMessage, setDisplayMessage] = useState('');

	usePostDataToFetchResult(setBackendResponse, backendResponse, apiError, setApiError,dataToFetchFinalResult);

	useEffect(() => {
		if (Object.keys(backendResponse).length > 0) {
			console.log(`backendResponse ${JSON.stringify(backendResponse)}`);
			const { planet_name } = backendResponse;
			planet_name
				? setDisplayMessage(`CONGRATULATIONS . YOU FOUND AL FALCONE ON ${planet_name.toUpperCase()}.`)
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

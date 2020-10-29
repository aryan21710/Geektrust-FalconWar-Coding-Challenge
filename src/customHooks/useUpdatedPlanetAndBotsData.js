import { useEffect } from 'react';

export const useUpdatedPlanetAndBotsData = (selecPlanetCnt, selectedPlanet, setSelectedPlanet) => {
	useEffect(() => {
		if (selecPlanetCnt === 4) {
			const filteredSelPlanetData = selectedPlanet.filter(
				(planetDetails) => planetDetails.planetname !== '' && planetDetails.distance !== ''
			);
			setSelectedPlanet(filteredSelPlanetData);
			localStorage.setItem('selectedPlanet', JSON.stringify(filteredSelPlanetData));
		}
	}, [selecPlanetCnt]);
};

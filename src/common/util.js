export const createPlanetCordToDisplay = (planetData, PlanetImageArr) => {
	const [Planet1, Planet2, Planet3, Planet4, Planet5, Planet6] = PlanetImageArr;
	const _ = planetData
		.map((_) => {
			return {
				distance: _.distance,
				planetname: _.name,
			};
		})
		.map((_, idx) => {
			switch (idx) {
				case 0: {
					return { ..._, imgName: Planet1, topPos: '10vh', index: -1, leftpos: '0vw' };
				}
				case 1: {
					return { ..._, imgName: Planet2, topPos: '2vh', index: -1, leftpos: '10vw' };
				}
				case 2: {
					return { ..._, imgName: Planet3, topPos: '18vh', index: -1, leftpos: '10vw' };
				}
				case 3: {
					return { ..._, imgName: Planet4, topPos: '20vh', index: -1, leftpos: '25vw' };
				}
				case 4: {
					return { ..._, imgName: Planet5, topPos: '15vh', index: -1, leftpos: '40vw' };
				}
				case 5: {
					return { ..._, imgName: Planet6, topPos: '8vh', index: -1, leftpos: '50vw' };
				}
				default:
					return {};
			}
		});

	console.log(`createPlanetCordToDisplay ${JSON.stringify(_)}`);
	return _;
};

export const updatePlanetSelectionData = (selecPlanetCnt, selectedPlanet, setSelectedPlanet) => {
    localStorage.removeItem('selectedPlanet');
	if (selecPlanetCnt === 4) {
		const filteredSelPlanetData = selectedPlanet.filter(
			(planetDetails) => planetDetails.planetname !== '' && planetDetails.distance !== ''
		);
		setSelectedPlanet(filteredSelPlanetData);
		localStorage.setItem('selectedPlanet', JSON.stringify(filteredSelPlanetData));
	}
};

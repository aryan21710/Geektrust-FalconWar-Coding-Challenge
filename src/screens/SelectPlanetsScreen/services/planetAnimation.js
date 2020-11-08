export const updateSelectedPlanetDataForAnim = (...args) => {
	const [values, selectedPlanet, indexOfSelectedPlanet, setSelectedPlanet] = args;
	const { planetname, planetindex, imgname, distance, animPlanetCnt } = values;
	if (planetindex > -1 && animPlanetCnt <= 4) {
		const updatedSelectedPlanet = selectedPlanet.map((selecPlanData, idx) => {
			if (idx === animPlanetCnt - 1) {
				return {
					isAnimated: true,
					imgname,
					index: animPlanetCnt - 1,
					planetname,
					distance,
					opacity: idx === indexOfSelectedPlanet ? 0.3 : 1,
				};
			} else if (selecPlanData.isAnimated && idx !== animPlanetCnt - 1) {
				return {
					...selecPlanData,
					isAnimated: false,
					opacity: indexOfSelectedPlanet > -1 && idx === indexOfSelectedPlanet ? 0.3 : 1,
				};
			} else {
				return {
					...selecPlanData,
					isAnimated: false,
					opacity: indexOfSelectedPlanet > -1 && idx === indexOfSelectedPlanet ? 0.3 : 1,
				};
			}
		});
		setSelectedPlanet(updatedSelectedPlanet);
	}
};

export const reduceOpacityOfPlanetInSolarSystem = (...args) => {
	const [planetDataUsedForRender, planetNameArr, indexOfSelectedPlanet, setPlanetDataUsedForRender] = args;
	const planetDataWithReducedOpacity = planetDataUsedForRender.map((planet) => {
		return planetNameArr.includes(planet.planetname)
			? {
					...planet,
					opacity: indexOfSelectedPlanet > -1 ? 0.3 : 1,
			  }
			: {
					...planet,
					opacity: 1,
			  };
	});
	setPlanetDataUsedForRender(planetDataWithReducedOpacity);
};

export const applyAnimForSelecPlanet = (...args) => {
	const [
		values,
		setValues,
		setIndexOfSelectedPlanet,
		selectedPlanet,
		indexOfSelectedPlanet,
		setSelectedPlanet,
		newData,
	] = args;
	const { planetname, planetindex, imgname, distance } = newData;
	const newPlanetData = {
		imgname,
		planetname,
		distance,
		index: planetindex,
		isAnimated: true,
		opacity: 1,
	};
	selectedPlanet.splice(indexOfSelectedPlanet, 1, newPlanetData);
	const updatedSelecPlanetNames = selectedPlanet
		.filter((planet) => planet.planetname.length > 0)
		.map((_) => _.planetname);
	setSelectedPlanet(selectedPlanet);
	setIndexOfSelectedPlanet(-1);
	setValues({ ...values, planetNameArr: [...updatedSelecPlanetNames] });
};

export const stopPlanetAnim = () =>
	alert('4 PLANETS ALREADY SELECTED. IF YOU WANT TO RESET THE SELECTION CLICK ON RESET PLANETS.');

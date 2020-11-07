export const updateSelectedPlanetDataForAnim = (...args) => {
	const [
		planetindex,
		animPlanetCnt,
		selectedPlanet,
		indexOfSelectedPlanet,
		setSelectedPlanet,
		planetImgName,
		planetname,
		distance,
	] = args;
	if (planetindex > -1 && animPlanetCnt <= 4) {
		const updatedSelectedPlanet = selectedPlanet.map((selecPlanData, idx) => {
			if (idx === animPlanetCnt - 1) {
				return {
					isAnimated: true,
					imgname: planetImgName,
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
	const [planetDataUsedForRender, selectedplanetnames, indexOfSelectedPlanet, setPlanetDataUsedForRender] = args;
	const planetDataWithReducedOpacity = planetDataUsedForRender.map((planet) => {
		return selectedplanetnames.includes(planet.planetname)
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
        selectedplanetnames,
		setSelectedplanetnames,
		setIndexOfSelectedPlanet,
		selectedPlanet,
		indexOfSelectedPlanet,
		newPlanetImgNameToSwap,
		newPlanetNameToSwap,
		newDistanceToSwap,
		newIndexToSwap,
		setSelectedPlanet,
	] = args;
	let oldPlanetName = '';
	const _ = selectedPlanet.map((planet) => {
		if (planet.index === indexOfSelectedPlanet) {
			oldPlanetName = planet.planetname;
			console.log(`applyAnimForSelecPlanet ${planet.imgname}::${newPlanetImgNameToSwap}`);
			return {
				...planet,
				imgname: newPlanetImgNameToSwap,
				planetname: newPlanetNameToSwap,
				distance: newDistanceToSwap,
				index: newIndexToSwap,
				isAnimated: true,
				opacity: 1,
			};
		} else {
			return {
				...planet,
				isAnimated: false,
			};
		}
	});

	const updatedSelecPlanetNames = selectedplanetnames.map((data) =>
		data === oldPlanetName ? newPlanetNameToSwap : data
	);
	console.log(`applyAnimForSelecPlanet ${JSON.stringify(_, null, 4)}`);
	setSelectedPlanet(_);
	setIndexOfSelectedPlanet(-1);
	setSelectedplanetnames(updatedSelecPlanetNames);
};

export const stopPlanetAnim = () =>
alert('4 PLANETS ALREADY SELECTED. IF YOU WANT TO RESET THE SELECTION CLICK ON RESET PLANETS.');



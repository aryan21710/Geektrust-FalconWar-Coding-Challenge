export const updateSelectedPlanetDataForAnim = (...args) => {
	const [values, selectedPlanet, idxOfSelecPlanForSwap, setSelectedPlanet,setSelecPlanetCount] = args;
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
					opacity: idx === idxOfSelecPlanForSwap ? 0.3 : 1,
				};
			} else if (selecPlanData.isAnimated && idx !== animPlanetCnt - 1) {
				return {
					...selecPlanData,
					isAnimated: false,
					opacity: idxOfSelecPlanForSwap > -1 && idx === idxOfSelecPlanForSwap ? 0.3 : 1,
				};
			} else {
				return {
					...selecPlanData,
					isAnimated: false,
					opacity: idxOfSelecPlanForSwap > -1 && idx === idxOfSelecPlanForSwap ? 0.3 : 1,
				};
			}
		});
		setSelectedPlanet(updatedSelectedPlanet);
		animPlanetCnt === 4 && setSelecPlanetCount(animPlanetCnt)
	} else {
		alert('4 PLANETS ALREADY SELECTED. IF YOU WANT TO RESET THE SELECTION CLICK ON RESET PLANETS.');
	}
};

export const reduceOpacityOfPlanetInSolarSystem = (...args) => {
	const [planetDataUsedForRender, planetNameArr, idxOfSelecPlanForSwap, setPlanetDataUsedForRender] = args;
	const planetDataWithReducedOpacity = planetDataUsedForRender.map((planet) => {
		return planetNameArr.includes(planet.planetname)
			? {
					...planet,
					opacity: idxOfSelecPlanForSwap > -1 ? 0.3 : 1,
			  }
			: {
					...planet,
					opacity: 1,
			  };
	});
	setPlanetDataUsedForRender(planetDataWithReducedOpacity);
};

export const planetAnimPostSwapForSelecPlan = (...args) => {
	const [
		values,
		setValues,
		setIdxOfSelecPlanForSwap,
		selectedPlanet,
		idxOfSelecPlanForSwap,
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
	// SWAP THE SOLARSYS PLANET WITH SELECTED PLANET IN selectedPlanet STATE
	selectedPlanet.splice(idxOfSelecPlanForSwap, 1, newPlanetData);
	const updatedSelecPlanetNames = selectedPlanet
		.filter((planet) => planet.planetname.length > 0)
		.map((_) => _.planetname);
		console.log(`updatedSelecPlanetNames ${updatedSelecPlanetNames}`);
	setSelectedPlanet(selectedPlanet);
	setIdxOfSelecPlanForSwap(-1);
	setValues({ ...values, planetNameArr: [...updatedSelecPlanetNames] });
};

export const stopPlanetAnim = () =>
	alert('4 PLANETS ALREADY SELECTED. IF YOU WANT TO RESET THE SELECTION CLICK ON RESET PLANETS.');

export const calcBotsTravelTime = (...args) => {
	const [planetAndBotsData, planetIndex, vehicleIndex, leftUnitsAndTravelTime, setLeftUnitsAndTravelTime,planetValue] = args;
	const planetDistance = planetAndBotsData[planetIndex].distance;
	const { vehicleDataArray } = planetAndBotsData[planetIndex];
	const vehicleMaxDistance = vehicleDataArray[vehicleIndex].distance;
	const totalUnits = vehicleDataArray[vehicleIndex].totalUnits;
	const vehicleSpeed = vehicleDataArray[vehicleIndex].speed;
	if (planetDistance <= vehicleMaxDistance && totalUnits.current > 0) {
		// leftUnitsAndTravelTime is array of 4. update all array.
		const updatedLeftUnitsAndTravelTime = leftUnitsAndTravelTime.map((data, idx) => {
			if (data.planetIndexArr.includes(planetIndex)) {
				return {
					...vehicleDataArray[idx],
					travelTime: 0,
					totalUnits: {
						original: vehicleDataArray[idx].totalUnits.original,
						current: !data.planetIndexArr.includes(planetIndex)
							? vehicleDataArray[idx].totalUnits.current
							: vehicleDataArray[idx].totalUnits.current + 1 <= vehicleDataArray[idx].totalUnits.original
							? vehicleDataArray[idx].totalUnits.current + 1
							: vehicleDataArray[idx].totalUnits.current,
					},
					planetIndexArr: data.planetIndexArr.includes(planetIndex)
						? [planetIndex]
						: [...data.planetIndexArr, planetIndex],
					vehicleIndexArr: [],
					error: true,
				};
			} else {
				if (idx === vehicleIndex) {
					// 1st new entry is added below
					return {
						...vehicleDataArray[idx],
						travelTime: Math.round(planetAndBotsData[planetIndex].distance / parseInt(vehicleSpeed)),
						totalUnits: {
							original: totalUnits.original,
							current: totalUnits.current - 1,
						},
						planetIndexArr: data.planetIndexArr.includes(planetIndex)
							? [planetIndex]
							: [...data.planetIndexArr, planetIndex],
						vehicleIndexArr: [vehicleIndex],
						error: false,
					};
				} else {
					// all old entry is overwritten
					return {
						...vehicleDataArray[idx],
						travelTime: 0,
						totalUnits: {
							original: vehicleDataArray[idx].totalUnits.original,
							current: data.planetIndexArr.includes(planetIndex)
								? vehicleDataArray[idx].totalUnits.current + 1
								: vehicleDataArray[idx].totalUnits.current,
						},
						planetIndexArr: data.planetIndexArr.includes(planetIndex)
							? [planetIndex]
							: [...data.planetIndexArr],
						vehicleIndexArr: [],
						error: false,
					};
				}
			}
		});
		console.log(`updatedLeftUnitsAndTravelTime ${planetIndex} :: ${planetValue} :: ${vehicleIndex}`);

		console.log(`updatedLeftUnitsAndTravelTime ${JSON.stringify(updatedLeftUnitsAndTravelTime, null, 4)}`);
		setLeftUnitsAndTravelTime([...updatedLeftUnitsAndTravelTime]);
	}
};


export const syncBotUnitsAndTravelTime = (...args) => {
	const [planetAndBotsData, planetIndex, vehicleIndex, leftUnitsAndTravelTime,planetValue,setPlanetAndBotsData] = args;

	const updatedPlanetAndBotsData = planetAndBotsData.map((planetData, idx) => {
		const _ = leftUnitsAndTravelTime.filter((data) => data.planetIndexArr.includes(idx));
		return {
			...planetData,
			planetIndexArr: [...planetData.planetIndexArr, planetIndex],
			planetValue: idx === planetIndex ? planetValue : planetData.planetValue,
			travelTime: _.length > 0 ? _[0].travelTime : planetData.travelTime,
			vehicleDataArray: [...leftUnitsAndTravelTime],
			error: idx === planetIndex ? leftUnitsAndTravelTime[vehicleIndex].error : planetData.error,
		};
	});
	setPlanetAndBotsData(updatedPlanetAndBotsData);
};

export const createMappingBetnPlanetAndBotsData = (
	vehicleName,
	vehicleIndex,
	planetValue,
	planetIndex,
	planetAndBotsData,
	setPlanetAndBotsData,
	dataToFetchFinalResult,
	setDataToFetchFinalResult
) => {
	const formattedVehicleName = vehicleName.replace(' ', '');
	console.log(`formattedVehicleName ${formattedVehicleName}`);
	console.log(`planetIndex ${planetIndex}`);
	console.log(`planetValue ${planetValue}`);
	console.log(`vehicleName ${vehicleName}`);
	console.log(`vehicleIndex ${vehicleIndex}`);

	const currentVehicleData = planetAndBotsData[planetIndex].vehicleDataArray[vehicleIndex];
	console.log(`currentVehicleData ${JSON.stringify(currentVehicleData, null, 4)}`);

	const data = `${planetValue.toUpperCase()}-${vehicleName.toUpperCase()}`;

	const currPlanetToVehMapping = planetAndBotsData[planetIndex].planetToVehMapping.includes(data)
		? [...planetAndBotsData[planetIndex].planetToVehMapping]
		: [...planetAndBotsData[planetIndex].planetToVehMapping, data];
	// [DONLON-SPACEPOD]
	// [DONLON-SPACEPOD,DONLON-SPACESHIP]

	// [DONLON-SPACEPOD]
	// [DONLON-SPACEPOD,JEBING-SPACEPOD]

	// IF MAPPING WITH SAME PLANET KEEP IT IN currPlanetToVehMapping . same planet should have  only max 2 entries in the arr.
	// OTHERWISE currPlanetToVehMapping.LENGTH && lastPlanetToVehMapping.length BOTH SHOLD BE 1
	console.log(`currPlanetToVehMapping ${JSON.stringify(currPlanetToVehMapping, null, 4)}`);

	let lastPlanetToVehMapping = 'PLNAME-VEHNAME';
	if (currPlanetToVehMapping.length > 1) {
		if (currPlanetToVehMapping[0].split('-')[0] !== planetValue.toUpperCase()) {
			lastPlanetToVehMapping = currPlanetToVehMapping.shift();
		} else {
			const currPlanetToVehMappingIdx=currPlanetToVehMapping.indexOf(data)
			lastPlanetToVehMapping = lastPlanetToVehMapping.length > 1 ? currPlanetToVehMapping[currPlanetToVehMappingIdx-1] : lastPlanetToVehMapping.join('');
		}
	}

	let leftUnits;
	if (currentVehicleData.travelTime > 0 && currentVehicleData.totalUnits > 0) {
		if (planetAndBotsData[planetIndex].planetToVehMapping.includes(data)) {
			leftUnits = currentVehicleData.totalUnits + 1 > currentVehicleData.maxUnits ? currentVehicleData.maxUnits:  currentVehicleData.totalUnits + 1;
		} else {
			leftUnits = currentVehicleData.totalUnits - 1 > 0 ? currentVehicleData.totalUnits - 1 :  0;
		}
	} else {
		leftUnits = currentVehicleData.totalUnits;
	}

	console.log(`currPlanetToVehMapping ${JSON.stringify(currPlanetToVehMapping, null, 4)}`);
	console.log(`lastPlanetToVehMapping ${JSON.stringify(lastPlanetToVehMapping, null, 4)}`);
	console.log(`leftUnits ${leftUnits}`);

	const updatedMappedDataForPlanetAndBots = planetAndBotsData.map((data, idx) => {
		return {
			...data,
			vehicleName: idx === planetIndex ? vehicleName : data.vehicleName,
			planetToVehMapping: [...currPlanetToVehMapping],
			travelTime: idx === planetIndex ? currentVehicleData.travelTime : data.travelTime,
			vehicleDataArray: data.vehicleDataArray.map((vehicleData, idx) => {
				if (vehicleData.name === formattedVehicleName) {
					return {
						...vehicleData,
						totalUnits: leftUnits,
						botImageName: '',
					};
				} else {
					if (
						lastPlanetToVehMapping.split('-')[0] === planetValue.toUpperCase() &&
						vehicleData.name.toUpperCase() === lastPlanetToVehMapping.split('-')[1]
					) {
						return {
							...vehicleData,
							totalUnits:  vehicleData.totalUnits + 1 > vehicleData.maxUnits ? vehicleData.maxUnits:  vehicleData.totalUnits + 1,
							botImageName: '',
						};
					} else {
						return {
							...vehicleData,
							botImageName: '',
						};
					}
				}
			}),
		};
	});

	const planetName = planetAndBotsData.map((planetData) => planetData.planetname);
	const vehicleSelectedForInvasionCnt = updatedMappedDataForPlanetAndBots.filter((data) => data.travelTime > 0);
	console.log(`updatedLeftUnitsAndTravelTime ${JSON.stringify(vehicleSelectedForInvasionCnt, null, 4)}`);

	const vehicleToTravelTimeMapping = {};
	updatedMappedDataForPlanetAndBots.forEach((data) => {
		if (data.travelTime > 0) {
			vehicleToTravelTimeMapping[data.planetname] = data.travelTime;
		}
	});

	console.log(`updatedMappedDataForPlanetAndBots ${JSON.stringify(updatedMappedDataForPlanetAndBots, null, 4)}`);
	if (vehicleSelectedForInvasionCnt.length === 4) {
		setDataToFetchFinalResult({
			...dataToFetchFinalResult,
			token: dataToFetchFinalResult?.token ? dataToFetchFinalResult.token : localStorage.getItem('token'),
			planet_names: planetName,
			vehicle_names: vehicleSelectedForInvasionCnt.map((data) => data.planetValue),
			vehicleToTravelTimeMapping,
		});
	}

	setPlanetAndBotsData([...updatedMappedDataForPlanetAndBots]);
};

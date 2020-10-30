import React, { useContext, useState, useEffect } from 'react';
import SelectBotView from './SelectBotView';
import { PlanetDetailsContext } from '../../context/appContext';

const SelectBotContainer = () => {
	const { setFinalData, finalData } = useContext(PlanetDetailsContext);

	const [selectedPlanet, setSelectedPlanet] = useState({
		planetIndex: -1,
		planetValue: '',
		vehicleIndex: -1,
	});

	const { planetIndex, planetValue, vehicleIndex } = selectedPlanet;
	const [planetAndBotsData, setPlanetAndBotsData] = useState([]);
	const [leftUnitsAndTravelTime, setLeftUnitsAndTravelTime] = useState([]);

	useEffect(() => {
		setPlanetAndBotsData(populatePlanetAndBotsData());
	}, []);

	useEffect(() => {
		if (planetValue.length > 0 && planetIndex > -1 && vehicleIndex > -1) {
			updateBotUnitsAndTravelTime();
		} else {
			setSelectedPlanet({
				planetIndex: -1,
				planetValue: '',
				vehicleIndex: -1,
			});
		}
	}, [planetValue, planetIndex, vehicleIndex]);

	useEffect(() => {
		Object.keys(leftUnitsAndTravelTime).length > 0 && calcTimeTravelAndBotsLeft();
	}, [leftUnitsAndTravelTime]);

	const populatePlanetAndBotsData = () => {
		const filteredArrOfSelectedPlanet = JSON.parse(localStorage.getItem('selectedPlanet'));
		return filteredArrOfSelectedPlanet.map((data) => ({
			...data,
			planetIdx: -1,
			finalStatus: false,
			vehicleDataArray: JSON.parse(localStorage.getItem('planetCfg')).map((data) => ({
				name: data.name,
				botImageName: 'data.imgName',
				distance: data.distance,
				speed: data.speed,
				travelTime: 0,
				totalUnits: {
					original: data.totalUnits,
					current: data.totalUnits,
				},
				error: true,
			})),
		}));
	};

	const onRadioChange = (e) => {
		setSelectedPlanet({
			planetIndex: parseInt(e.target.dataset.planetidx),
			planetValue: e.target.value,
			vehicleIndex: parseInt(e.target.dataset.vehicleidx),
		});
	};

	const updateBotUnitsAndTravelTime = () => {
		const planetDistance = planetAndBotsData[planetIndex].distance;
		const { vehicleDataArray } = planetAndBotsData[planetIndex];
		const vehicleMaxDistance = vehicleDataArray[vehicleIndex].distance;
		const totalUnits = vehicleDataArray[vehicleIndex].totalUnits;
		const vehicleSpeed = vehicleDataArray[vehicleIndex].speed;
		if (planetDistance <= vehicleMaxDistance && totalUnits.current > 0) {
			setLeftUnitsAndTravelTime([
				...leftUnitsAndTravelTime,
				{
					...leftUnitsAndTravelTime,
					vehicleName: vehicleDataArray[vehicleIndex].name,
					leftUnits: totalUnits.current - 1,
					travelTime: Math.round(planetAndBotsData[planetIndex].distance / parseInt(vehicleSpeed)),
					planetIndex,
					vehicleIndex,
				},
			]);
		} else {
			setLeftUnitsAndTravelTime([...leftUnitsAndTravelTime]);
		}
	};

	const findLeftUnits = (currentVehicleName = undefined) => {
		if (currentVehicleName) {
			console.log(`currentVehicleName ${currentVehicleName}`);
			const _ = leftUnitsAndTravelTime.find((name) => currentVehicleName === name.vehicleName);
			if (_) {
				const { leftUnits, travelTime } = _;
				return {
					leftUnits,
					travelTime,
				};
			} else {
				return {
					leftUnits: -1,
					travelTime: -1,
				};
			}
		} else {
			const { leftUnits, travelTime } = leftUnitsAndTravelTime.find((name) => planetValue === name.vehicleName);
			return {
				leftUnits,
				travelTime,
			};
		}
	};

	const calcTimeTravelAndBotsLeft = () => {
		console.log(`updatedPlanetAndBotsData ${planetIndex} :: ${planetValue} ::  ${vehicleIndex}`);
		const updatedPlanetAndBotsData = planetAndBotsData.map((planetData, planetidx) => {
			const { vehicleDataArray } = planetData;
			if (planetidx === planetIndex) {
				const _ = vehicleDataArray.map((vehicleData, idx) => {
					if (idx === vehicleIndex) {
						return {
							...vehicleData,
							totalUnits: {
								original: vehicleData.totalUnits.original,
								current: findLeftUnits().leftUnits,
							},
							travelTime: findLeftUnits().travelTime,
						};
					} else {
						return {
							...vehicleData,
							totalUnits: {
								original: vehicleData.totalUnits.original,
								current: vehicleData.totalUnits.original,
							},
							travelTime: 0,
						};
					}
				});
				return {
					...planetData,
					vehicleDataArray: _,
				};
			} else {
				return {
					...planetData,
					vehicleDataArray: vehicleDataArray.map((vehicleData, idx) => {
						if (idx === vehicleIndex) {
							return {
								...vehicleData,
								totalUnits: {
									original: vehicleData.totalUnits.original,
									current: findLeftUnits().leftUnits,
								},
								travelTime: 0,
							};
						} else {
							/* FOLLOWING CLAUSE NOT WORKING FOR TOTAL-UNITS */
							return {
								...vehicleData,
								totalUnits: {
									original: vehicleData.totalUnits.original,
									current:
										findLeftUnits(vehicleData.name).leftUnits === -1
											? vehicleData.totalUnits.original
											: findLeftUnits(vehicleData.name).leftUnits,
								},
								travelTime: 0,
							};
						}
					}),
				};
			}
		});

		console.log(`updatedPlanetAndBotsData ${JSON.stringify(updatedPlanetAndBotsData, null, 4)}`);
		setPlanetAndBotsData([...updatedPlanetAndBotsData]);
	};

	return (
		<React.Fragment>
			<SelectBotView
				planetAndBotsData={planetAndBotsData}
				finalData={finalData}
				onRadioChange={onRadioChange}
				vehicleIndex={vehicleIndex}
				planetIndex={planetIndex}
			/>
		</React.Fragment>
	);
};

export default SelectBotContainer;

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
	const [leftUnitsAndTravelTime, setLeftUnitsAndTravelTime] = useState(
		Array(4).fill({
			name: '',
			botImageName: '',
			distance: '',
			speed: '',
			travelTime: 0,
			totalUnits: {
				original: -1,
				current: -1,
			},
			error: true,
			planetIndexArr: [],
			vehicleIndexArr: [],
		})
	);

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
		planetValue.length > 0 && planetIndex > -1 && vehicleIndex > -1 && syncBotUnitsAndTravelTime();
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

	const syncBotUnitsAndTravelTime = () => {
		// alert('called');
		const updatedPlanetAndBotsData = planetAndBotsData.map((data) => {
			return {
				...data,
				vehicleDataArray: [...leftUnitsAndTravelTime],
			};
		});

		setPlanetAndBotsData(updatedPlanetAndBotsData);
	};

	const updateBotUnitsAndTravelTime = () => {
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
							current:
							vehicleDataArray[idx].totalUnits.current + 1 <= vehicleDataArray[idx].totalUnits.original
									? vehicleDataArray[idx].totalUnits.current + 1
									: vehicleDataArray[idx].totalUnits.original,
						},
						planetIndexArr: [],
						vehicleIndexArr: [],
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
							planetIndexArr: [planetIndex],
							vehicleIndexArr: [vehicleIndex],
						};
					} else {
						// all old entry is overwritten
						return {
							...vehicleDataArray[idx],
							travelTime: 0,
							totalUnits: {
								original: vehicleDataArray[idx].totalUnits.original,
								current: vehicleDataArray[idx].totalUnits.current,
							},
							planetIndexArr: [],
							vehicleIndexArr: [],
						};
					}
				}
			});

			setLeftUnitsAndTravelTime([...updatedLeftUnitsAndTravelTime]);
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
					planetIndexArr: [],
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

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

	useEffect(() => {
		setPlanetAndBotsData(populatePlanetAndBotsData());
	}, []);



	useEffect(() => {
		if (planetValue.length > 0 && planetIndex > -1 && vehicleIndex > -1) {
			calcTimeTravelAndBotsLeft();
		} else {
			setSelectedPlanet({
				planetIndex: -1,
                planetValue: '',
                vehicleIndex: -1
			});
		}
    }, [planetValue, planetIndex,vehicleIndex]);
    

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

	const onRadioChange = (planetidx) => (e) => {
		console.log(`onRadioChange ${e.target.value} :: ${planetidx} :: ${e.target.dataset.vehicleidx}`);
		setSelectedPlanet({
			planetIndex: planetidx,
			planetValue: e.target.value,
			vehicleIndex: e.target.dataset.vehicleidx,
		});
	};

	// const updatePlanetIdx = () => {
	// 	const updatedPlanetAndBotsData = planetAndBotsData.map((data, idx) => {
	// 		return idx === planetIndex ? { ...data, planetIdx: planetIndex } : { ...data, planetIdx: -1 };
	// 	});
	// 	setPlanetAndBotsData(updatedPlanetAndBotsData);
	// };

	const calcTimeTravelAndBotsLeft = () => {
		const updatedPlanetAndBotsData = planetAndBotsData[planetIndex].vehicleDataArray.map(
			(vehicleData, vehicleIdx) => {
				if (
					vehicleData.name === planetValue &&
					parseInt(planetAndBotsData[planetIndex].distance) <= vehicleData.distance &&
					vehicleData.totalUnits.current > 0
				) {
					return {
						...vehicleData,
						totalUnits: {
							original: vehicleData.totalUnits.original,
							current: vehicleData.totalUnits.current - 1,
						},
						travelTime: Math.round(planetAndBotsData[planetIndex].distance / parseInt(vehicleData.speed)),
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
			}
		);

		console.log(`updatedPlanetAndBotsData ${JSON.stringify(updatedPlanetAndBotsData, null, 4)}`);

		const unchangedPlanetAndBotsData = planetAndBotsData.map((planetData, idx) => {
			if (idx !== planetIndex) {
				return { ...planetData };
			} else {
				return { ...planetData, vehicleDataArray: updatedPlanetAndBotsData };
			}
		});

		setPlanetAndBotsData([...unchangedPlanetAndBotsData]);
	};

	return (
		<React.Fragment>
			<SelectBotView
				planetAndBotsData={planetAndBotsData}
				finalData={finalData}
				onRadioChange={onRadioChange}
				vehicleIndex={vehicleIndex}
			/>
		</React.Fragment>
	);
};

export default SelectBotContainer;

import React, { useContext, useState, useEffect } from 'react';
import { SelectBot } from './index';
import { PlanetDetailsContext } from '../../context/appContext';
import { calcBotsTravelTime, syncBotUnitsAndTravelTime } from './services';
import {unitsAndTravelTimeData} from '../../constants'

const SelectBotsScreen = () => {
	const { dataToFetchFinalResult } = useContext(PlanetDetailsContext);

	const [selectedPlanet, setSelectedPlanet] = useState({
		planetIndex: -1,
		planetValue: '',
		vehicleIndex: -1,
	});

	const { planetIndex, planetValue, vehicleIndex } = selectedPlanet;
	const [planetAndBotsData, setPlanetAndBotsData] = useState([]);
	const [remainingUnitsAndTravelTime, setRemainingUnitsAndTravelTime] = useState(unitsAndTravelTimeData);

	useEffect(() => {
		setPlanetAndBotsData(populatePlanetAndBotsData());
	}, []);

	useEffect(() => {
		if (planetValue.length > 0 && planetIndex > -1 && vehicleIndex > -1) {
			calcBotsTravelTime(
				planetAndBotsData,
				planetIndex,
				vehicleIndex,
				remainingUnitsAndTravelTime,
				setRemainingUnitsAndTravelTime,
				planetValue
			);
		} else {
			setSelectedPlanet({
				planetIndex: -1,
				planetValue: '',
				vehicleIndex: -1,
			});
		}
	}, [planetValue, planetIndex, vehicleIndex]);

	useEffect(() => {
		planetValue.length > 0 &&
			planetIndex > -1 &&
			vehicleIndex > -1 &&
			syncBotUnitsAndTravelTime(
				planetAndBotsData,
				planetIndex,
				vehicleIndex,
				remainingUnitsAndTravelTime,
				planetValue,
				setPlanetAndBotsData
			);
	}, [remainingUnitsAndTravelTime]);

	const populatePlanetAndBotsData = () => {
		const filteredArrOfSelectedPlanet = JSON.parse(localStorage.getItem('selectedPlanet'));
		return filteredArrOfSelectedPlanet.map((data) => ({
			...data,
			planetIdx: -1,
			planetIndexArr: [],
			travelTime: 0,
			finalStatus: false,
			planetValue: '',
			error: false,
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
			})),
		}));
	};

	const onRadioChange = (e) =>
		setSelectedPlanet({
			planetIndex: parseInt(e.target.options[e.target.selectedIndex].dataset.planetidx),
			planetValue: e.target.value,
			vehicleIndex: parseInt(e.target.options[e.target.selectedIndex].dataset.vehicleidx),
		});

	return (
		<React.Fragment>
			<SelectBot
				planetAndBotsData={planetAndBotsData}
				dataToFetchFinalResult={dataToFetchFinalResult}
				onRadioChange={onRadioChange}
				vehicleIndex={vehicleIndex}
				planetIndex={planetIndex}
				planetValue={planetValue}
			/>
		</React.Fragment>
	);
};

export default SelectBotsScreen;

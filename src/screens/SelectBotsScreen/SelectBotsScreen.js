import React, { useContext, useState, useEffect } from 'react';
import { SelectBot } from './index';
import { PlanetDetailsContext } from '../../context/appContext';
import { createMappingBetnPlanetAndBotsData } from './services';

const SelectBotsScreen = () => {
	const {
		dataToFetchFinalResult,
		setDataToFetchFinalResult,
		mappingBetnPlanetAndBotsData,
		setMappingBetnPlanetAndBotsData,
	} = useContext(PlanetDetailsContext);

	const [selectedPlanet, setSelectedPlanet] = useState({
		planetIndex: -1,
		planetName: '',
		vehicleIndex: -1,
		planetIndexArr: [],
		vehicleName: '',
	});

	const [planetAndBotsData, setPlanetAndBotsData] = useState(JSON.parse(localStorage.getItem('planetAndBotsData')));

	const { vehicleName, planetIndex, planetName, vehicleIndex, planetIndexArr } = selectedPlanet;

	useEffect(() => {
		if (planetName.length > 0 && planetIndex > -1 && vehicleIndex > -1) {
			createMappingBetnPlanetAndBotsData(
				vehicleName,
				vehicleIndex,
				planetName,
				planetIndex,
				planetAndBotsData,
				setPlanetAndBotsData,
				dataToFetchFinalResult,
				setDataToFetchFinalResult
			);
		} else {
			setSelectedPlanet({
				planetIndex: -1,
				planetName: '',
				vehicleIndex: -1,
				planetIndexArr: [],
			});
		}
	}, [planetName, planetIndex, vehicleIndex]);

	const onDropDownChange = (e) => {
		setSelectedPlanet({
			planetIndex: parseInt(e.target.options[e.target.selectedIndex].dataset.planetidx),
			vehicleName: e.target.value,
			planetName: e.target.options[e.target.selectedIndex].dataset.planetname,
			vehicleIndex: parseInt(e.target.options[e.target.selectedIndex].dataset.vehicleidx),
			planetIndexArr: planetIndexArr.includes(
				parseInt(e.target.options[e.target.selectedIndex].dataset.planetidx)
			)
				? [...planetIndexArr]
				: [...planetIndexArr, parseInt(e.target.options[e.target.selectedIndex].dataset.planetidx)],
		});
	};

	return (
		<React.Fragment>
			<SelectBot
				planetAndBotsData={planetAndBotsData}
				dataToFetchFinalResult={dataToFetchFinalResult}
				onDropDownChange={onDropDownChange}
				planetIndexArr={planetIndexArr}
				vehicleIndex={vehicleIndex}
				vehicleName={vehicleName}
				planetIndex={planetIndex}
				
			/>
		</React.Fragment>
	);
};

export default SelectBotsScreen;

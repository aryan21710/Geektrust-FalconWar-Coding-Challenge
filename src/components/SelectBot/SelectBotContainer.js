import React, { useContext, useState, useEffect } from 'react';
import SelectBotView from './SelectBotView';
import { PlanetDetailsContext } from '../../context/appContext';

const SelectBotContainer = () => {
	const { setFinalData, finalData } = useContext(PlanetDetailsContext);

	const [selectedPlanet, setSelectedPlanet] = useState({
		planetIndex: -1,
		planetValue: '',
	});
	const { planetIndex, planetValue } = selectedPlanet;
	const [planetAndBotsData, setPlanetAndBotsData] = useState([]);

	useEffect(() => {
		setPlanetAndBotsData(populatePlanetAndBotsData());
	}, []);

	const populatePlanetAndBotsData = () => {
		const filteredArrOfSelectedPlanet = JSON.parse(localStorage.getItem('selectedPlanet'));
		return filteredArrOfSelectedPlanet.map((data) => ({
			...data,
			finalStatus: false,
			vehicleDataArray: JSON.parse(localStorage.getItem('planetCfg')).map((data) => ({
				name: data.name,
				botImageName: data.imgName,
				distance: data.distance,
				speed: data.speed,
				travelTime: 0,
				totalUnits: data.totalUnits,
				error: true,
			})),
		}));
	};

	useEffect(() => {
		if (planetValue.length > 0 && planetIndex > -1) {
			calcTimeTravelAndBotsLeft();
		} else {
			setSelectedPlanet({
				planetIndex: -1,
				planetValue: '',
			});
		}
	}, [planetValue, planetIndex]);

    const calcTimeTravelAndBotsLeft = () => {};
    
    const onRadioChange=(idx)=>(e)=>{
        console.log(`onRadioChange ${e.target.value} :: ${idx}`)
    }

	const onSelectedVehicleIdx = (e) => {
		e.preventDefault();
		setSelectedPlanet({
			planetIndex: parseInt(e.target.options[e.target.selectedIndex].dataset.index),
			planetValue: e.target.value,
		});
	};

	return (
		<React.Fragment>
			<SelectBotView
				planetAndBotsData={planetAndBotsData}
				onSelectedVehicleIdx={onSelectedVehicleIdx}
                finalData={finalData}
                onRadioChange={onRadioChange}
			/>
		</React.Fragment>
	);
};

export default SelectBotContainer;

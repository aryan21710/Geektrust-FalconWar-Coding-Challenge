import React, { useContext, useState, useEffect } from 'react';
import SelectBotView from './SelectBotView'
import { PlanetDetailsContext } from '../../context/appContext';


 const SelectBotContainer = () => {
    const { setFinalData, finalData } = useContext(PlanetDetailsContext);
	const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(-1);
	const [selectedVehicle, setSelectedVehicle] = useState('');
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
		if (selectedVehicle.length > 0 && selectedPlanetIndex > -1) {
			calcTimeTravelAndBotsLeft();
		} else {
			setSelectedVehicle('');
		}
	}, [selectedVehicle, selectedPlanetIndex]);

	const calcTimeTravelAndBotsLeft = () => {
		let error = false;
		let planetName = '';
		let vehicleName = '';
		const updatedPlanetAndBotsData = planetAndBotsData
			.map((planetData, idx) => {
				if (idx === selectedPlanetIndex) {
					const { vehicleDataArray } = planetData;
					const vehicleIndex = vehicleDataArray.findIndex(
						(vehicleData) => vehicleData.name === selectedVehicle
					);
					let sortedPlanetData = vehicleDataArray.splice(vehicleIndex, 1);
					sortedPlanetData = sortedPlanetData.concat(vehicleDataArray);
					return { ...planetData, vehicleDataArray: sortedPlanetData };
				} else {
					return { ...planetData };
				}
			})
			.map((planetData, idx) => {
				const { vehicleDataArray } = planetData;
				const distanceToPlanet = parseInt(planetData.distance);
				if (idx === selectedPlanetIndex) {
					const temp = vehicleDataArray.map((vehicleData) => {
						if (vehicleData.name === selectedVehicle) {
							if (distanceToPlanet > vehicleData.distance) {
								alert(`OOPS!! YOU CANNOT TRAVEL TO ${planetData.planetname} USING ${vehicleData.name}`);
								error = true;
								return { ...vehicleData, error: true };
							} else {
								if (vehicleData.totalUnits === 0) {
									error = true;
									alert(
										`OOPS!! YOU RAN OUT OF ${vehicleData.name}. PLEASE USE SOME OTHER BOT FOR INVASION.`
									);
									return { ...vehicleData, error: true };
								} else {
									planetName = planetData.planetname;
									vehicleName = vehicleData.name;
									return {
										...vehicleData,
										travelTime: Math.round(distanceToPlanet / parseInt(vehicleData.speed)),
										error: false,
									};
								}
							}
						} else {
							return { ...vehicleData };
						}
					});
					return { ...planetData, vehicleDataArray: temp };
				} else {
					return {
						...planetData,
					};
				}
			})
			.map((planetData) => {
				const { vehicleDataArray } = planetData;
				return {
					...planetData,
					vehicleDataArray: vehicleDataArray.map((vehicleData) => {
						return {
							...vehicleData,
							totalUnits:
								vehicleData.name === selectedVehicle && vehicleData.totalUnits > 0 && !error
									? vehicleData.totalUnits - 1
									: vehicleData.totalUnits,
						};
					}),
				};
			});
		setPlanetAndBotsData(updatedPlanetAndBotsData);
		setFinalData({
			...finalData,
			token: finalData?.token ? finalData.token : localStorage.getItem('token'),
			planet_names: planetName.length > 0 ? [...finalData.planet_names, planetName] : [...finalData.planet_names],
			vehicle_names:
				vehicleName.length > 0 ? [...finalData.vehicle_names, vehicleName] : [...finalData.vehicle_names],
		});
	};

	const onSelectedVehicleIdx = (e) => {
		e.preventDefault();
		const dropDownSelIndex = parseInt(e.target.options[e.target.selectedIndex].dataset.index);
		setSelectedPlanetIndex(dropDownSelIndex);
		setSelectedVehicle(e.target.value);
	};

    return (
        <React.Fragment>
            <SelectBotView planetAndBotsData={planetAndBotsData} onSelectedVehicleIdx={onSelectedVehicleIdx} finalData={finalData}/>
        </React.Fragment>
    )
}

export default SelectBotContainer

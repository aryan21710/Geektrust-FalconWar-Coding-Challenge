import React, { useContext, useState, useEffect } from 'react';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	BadgeWrapper,
	SelectedPlanetImg,
	Heading,
	Select,
	PlanetWrapper,
	ImageWrapper,
} from './common/StyledComponent';
import { CustomButton } from '../components/common/CustomButton';
import uuid from 'react-uuid';
import { PlanetDetailsContext } from '../context/appContext';
import { useHistory } from 'react-router';

const SelectBots = () => {
	const { selectedPlanet, setFinalData, finalData } = useContext(PlanetDetailsContext);
	const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(-1);
	const [selectedVehicle, setSelectedVehicle] = useState('');
	const [planetAndBotsData, setPlanetAndBotsData] = useState([]);
	const history = useHistory();

	useEffect(() => {
		setPlanetAndBotsData(populatePlanetAndBotsData());
	}, []);

	const populatePlanetAndBotsData = () => {
		const filteredArrOfSelectedPlanet = JSON.parse(localStorage.getItem('selectedPlanet')) ;
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
								return { ...vehicleData };
							} else {
								if (vehicleData.totalUnits === 0) {
									error = true;
									alert(
										`OOPS!! YOU RAN OUT OF ${vehicleData.name}. PLEASE USE SOME OTHER BOT FOR INVASION.`
									);
									return { ...vehicleData };
								} else {
									planetName = planetData.planetname;
									vehicleName = vehicleData.name;
									return {
										...vehicleData,
										travelTime: Math.round(distanceToPlanet / parseInt(vehicleData.speed)),
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
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="75vh" width="100vw" flexDirection="column">
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					Choose Space Vehicles to Invade the Planets.
				</Heading>
				<PlanetWrapper justifyContent="flex-start" flexDirection="row" height="60vh">
					{planetAndBotsData.map(({ planetname, imgname, vehicleDataArray, distance }, idx) => (
						<BadgeWrapper justifyContent="flex-start" key={uuid()} height="60vh" flexDirection="column">
							<SelectedPlanetImg margin="1vh 0vw" imgname={imgname} />
							<Heading color="#FAD107" fontSize="1.2rem">
								{planetname}
							</Heading>
							<Heading color="#FAD107" fontSize="1rem">{`DISTANCE ${distance} megamiles`}</Heading>
							<Select name="planetName" onChange={onSelectedVehicleIdx}>
								{selectedPlanetIndex !== idx && vehicleDataArray[0].travelTime === 0 && (
									<option key={uuid()} defaultValue="Choose A Space Vehicle">
										Choose A Space Vehicle
									</option>
								)}
								{vehicleDataArray.map((bot) => (
									<option key={uuid()} data-index={idx} value={bot.name}>
										{`${bot.name} (${bot.totalUnits})`}
									</option>
								))}
							</Select>
							{vehicleDataArray[0].travelTime > 0 && (
								<React.Fragment>
									<ImageWrapper
										rotateBy="25deg"
										objectFit="contain"
										borderRad="0px"
										width="20vw"
										height="20vh"
										marginBottom="3vh"
										src={vehicleDataArray[0].botImageName}
									/>
									<Heading fontSize="1rem" color="#FAD107">
										{`Time Taken:- ${vehicleDataArray[0].travelTime}`}
									</Heading>
								</React.Fragment>
							)}
						</BadgeWrapper>
					))}
				</PlanetWrapper>
			</SolarSystemWrapper>
			<CustomButton
				redirectPath="/displayfinalresult"
				disabled={finalData.planet_names.length === 4 ? false : true}
				leftpos="0vh"
				width="15vw"
				TextForButton="Mission Find Falcone"
			/>
		</SelectedPlanetWrapper>
	);
};

export default SelectBots;

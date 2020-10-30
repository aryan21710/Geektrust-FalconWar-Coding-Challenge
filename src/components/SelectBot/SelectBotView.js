import React from 'react';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	BadgeWrapper,
	Heading,
	Select,
	PlanetWrapper,
} from '../common/StyledComponent';
import { CustomButton } from '../common/CustomButton';
import uuid from 'react-uuid';

const SelectBotView = ({ planetAndBotsData, onSelectedVehicleIdx, finalData, onRadioChange }) => {

	
	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="75vh" width="100vw" flexDirection="column">
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					Choose Space Vehicles to Invade the Planets.
				</Heading>
				<PlanetWrapper justifyContent="flex-start" flexDirection="row" height="60vh">
					{planetAndBotsData.map((planet, idx) => (
						<BadgeWrapper justifyContent="flex-start" key={uuid()} height="60vh" flexDirection="column">
							<Select name="planetName" onChange={onSelectedVehicleIdx}>
									<option key={uuid()} defaultValue="Choose A Space Vehicle">
										Choose A Space Vehicle
									</option>
						
								{planetAndBotsData.map((planet) => (
									<option key={uuid()} data-index={idx} value={planet.planetname}>
										{`${planet.planetname}`}
									</option>
								))}
							</Select>
							<Heading margin="2vh 0vw" color="#FAD107" fontSize="1.1rem">
								Please select the Space Vehicle:
							</Heading>
							<BadgeWrapper
								flex="0"
								height="20vh"
								width="20vw"
								alignItems="start"
								justifyContent="center"
								key={uuid()}
								flexDirection="column"
							>
								<BadgeWrapper
									flex="1"
									width="20vw"
									alignItems="start"
									justifyContent="flex-start"
									key={uuid()}
									flexDirection="row"
								>
									<input onChange={onRadioChange(idx)} type="radio" name="spacevehicle" value="spacepod" />
									<label style={{ color: 'white', marginLeft: "0.5vw" }} for="spacepod">
										Space-Pod
									</label>
								</BadgeWrapper>
								<BadgeWrapper
									flex="1"
									width="20vw"
									alignItems="start"
									justifyContent="flex-start"
									key={uuid()}
									flexDirection="row"
								>
									<input onChange={onRadioChange(idx)} type="radio" name="spacevehicle" value="spacerocket" />
									<label style={{ color: 'white', marginLeft: "0.5vw" }} for="spacerocket">
										Space-Rocket
									</label>
								</BadgeWrapper>

								<BadgeWrapper
									flex="1"
									width="20vw"
									alignItems="start"
									justifyContent="flex-start"
									key={uuid()}
									flexDirection="row"
								>
									<input onChange={onRadioChange(idx)} type="radio" name="spacevehicle" value="spaceshuttle" />
									<label style={{ color: 'white', marginLeft: "0.5vw" }} for="spaceshuttle">
										Space-Shuttle
									</label>
								</BadgeWrapper>

								<BadgeWrapper
									flex="1"
									width="20vw"
									alignItems="start"
									justifyContent="flex-start"
									key={uuid()}
									flexDirection="row"
								>
									<input onChange={onRadioChange(idx)} type="radio" name="spacevehicle" value="spaceship" />
									<label style={{ color: 'white', marginLeft: "0.5vw" }} for="spaceship">
										Space-Ship
									</label>
								</BadgeWrapper>
							</BadgeWrapper>
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
				opacity={finalData.planet_names.length === 4 ? 1 : 0.6}
			/>
		</SelectedPlanetWrapper>
	);
};

export default SelectBotView;
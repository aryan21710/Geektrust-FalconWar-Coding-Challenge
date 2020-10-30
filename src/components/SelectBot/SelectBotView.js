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

const SelectBotView = ({ planetAndBotsData, onSelectedVehicleIdx, finalData }) => {
	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="75vh" width="100vw" flexDirection="column">
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					Choose Space Vehicles to Invade the Planets.
				</Heading>
				<PlanetWrapper justifyContent="flex-start" flexDirection="row" height="60vh">
					{planetAndBotsData.map(({ planetname, imgname, vehicleDataArray, distance }, idx) => (
						<BadgeWrapper justifyContent="flex-start" key={uuid()} height="60vh" flexDirection="column">
							<Select name="planetName" onChange={onSelectedVehicleIdx}>
								{vehicleDataArray[0].error && (
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
									<input type="radio" name="spacepod" value="spacepod" />
									<label style={{ color: 'white' }} for="spacepod">
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
									<input type="radio" name="spacerocket" value="spacerocket" />
									<label style={{ color: 'white' }} for="spacerocket">
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
									<input type="radio" name="spaceshuttle" value="spaceshuttle" />
									<label style={{ color: 'white' }} for="spaceshuttle">
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
									<input type="radio" name="spaceship" value="spaceship" />
									<label style={{ color: 'white' }} for="spaceship">
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

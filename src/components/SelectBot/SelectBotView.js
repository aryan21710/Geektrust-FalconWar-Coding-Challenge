import React from 'react';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	BadgeWrapper,
	Heading,
	PlanetWrapper,
	SelectedPlanetImg
} from '../common/StyledComponent';
import { CustomButton } from '../common/CustomButton';
import uuid from 'react-uuid';

const SelectBotView = ({
	planetAndBotsData,
	onSelectedVehicleIdx,
	finalData,
	onRadioChange,
	planetIndex,
	planetValue,
}) => {
	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="75vh" width="100vw" flexDirection="column">
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					Choose Space Vehicles to Invade the Planets.
				</Heading>
				<PlanetWrapper justifyContent="flex-start" flexDirection="row" height="60vh">
					{planetAndBotsData.map(({ planetIdx, planetname, imgname, distance, vehicleDataArray }, idx) => (
						<BadgeWrapper justifyContent="flex-start" key={uuid()} height="40vh" flexDirection="column">
						<SelectedPlanetImg margin="1vh 0vw" imgname={imgname} />
						<Heading color="#FAD107" fontSize="1.2rem">
							{planetname}
						</Heading>
						<Heading color="#FAD107" fontSize="1rem">{`DISTANCE ${distance} megamiles`}</Heading>

							<Heading margin="3vh 0vw" color="#FAD107" fontSize="1.1rem">
								Please select the Space Vehicle:
							</Heading>
							{vehicleDataArray.map((vehicleData, vehicleIdx) => {
								return (
									<BadgeWrapper
										flex="1"
										width="20vw"
										height="1.5vh"
										alignItems="start"
										justifyContent="flex-start"
										key={uuid()}
										flexDirection="row"
									>
										<input
											onChange={onRadioChange(idx)}
											type="radio"
											name="spacevehicle"
											value={vehicleData.name}
											disabled={planetIdx === idx && planetValue.length > 0 ? false : true}
										/>
										<label
											style={{
												fontSize: '0.9rem',
												color: planetIdx === idx && planetValue.length > 0 ? 'white' : 'grey',
												marginLeft: '0.5vw',
											}}
											htmlFor={vehicleData.name}
										>
											{`${vehicleData.name} (${vehicleData.totalUnits})`}
										</label>
									</BadgeWrapper>
								);
							})}
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

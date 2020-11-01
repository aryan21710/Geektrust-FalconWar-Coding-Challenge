import React from 'react';
import {
	BadgeWrapper,
	Heading,
	Select,
} from '../common/StyledComponents/StyledCommonComp';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	PlanetWrapper,
	SelectedPlanetImg,
} from '../common/StyledComponents/StyledPlanetComp';
import { CustomButton } from '../common/CustomButton';
import uuid from 'react-uuid';

const SelectBotView = ({ planetAndBotsData, finalData, onRadioChange, vehicleIndex, planetIndex, planetValue }) => {
	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="75vh" width="100vw" flexDirection="column">
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					Choose Space Vehicles to Invade the Planets.
				</Heading>
				<PlanetWrapper justifyContent="flex-start" flexDirection="row" height="60vh">
					{planetAndBotsData.map(
						({ planetIndexArr, planetname, imgname, distance, vehicleDataArray }, idx) => (
							<BadgeWrapper justifyContent="flex-start" key={uuid()} height="50vh" flexDirection="column">
								<SelectedPlanetImg margin="1vh 0vw" imgname={imgname} />
								<Heading color="#FAD107" fontSize="1.2rem">
									{planetname}
								</Heading>
								<Heading color="#FAD107" fontSize="1rem">{`DISTANCE ${distance} megamiles`}</Heading>
								<Select
									width="15vw"
									name="planetName"
									// planetvalue is common to all that is why same value is getting reflected everywhere.
									value={planetIndexArr.includes(idx) ? planetAndBotsData[idx].planetValue : 'Choose A Space Vehicle'}
									onChange={onRadioChange}
								>
									{!planetIndexArr.includes(idx) && (
										<option key={uuid()} defaultValue="Choose A Space Vehicle">
											Choose A Space Vehicle
										</option>
									)}
									{vehicleDataArray.map((vehicleData, vehicleidx) => (
										<option
											key={uuid()}
											data-planetidx={idx}
											data-vehicleidx={vehicleidx}
											value={vehicleData.name}
										>
											{`${vehicleData.name} (${vehicleData.totalUnits.current})`}
										</option>
									))}
								</Select>
								<Heading margin="3vh 0vw" fontSize="1rem" color="#FAD107">
									{planetIndexArr.includes(idx)
										? `Time Taken:- ${planetAndBotsData[idx].travelTime}`
										: `Time Taken:- 0`}
								</Heading>
							</BadgeWrapper>
						)
					)}
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

/*

					
							

[{"vehicleName":"SPACE POD","leftUnits":1,"travelTime":50,"planetIndexArr":[0],"vehicleIndexArr":[0]},
{"vehicleName":"SPACE SHIP","leftUnits":1,"travelTime":10,"planetIndexArr":[0],"vehicleIndexArr":[3]}]

1] find planetindex  in planetIndexArr
	a] not present:- add entry , reduce total units current, calc traveltime in planetindex, copy the same 
					in all planetindex at vehicleindexes except traveltime which should be 0 in other
	b] present:- find old entry increase the totalunits by 1, traveltime = 0 and copy that in all planetindexes at its 
				respective vehicleindex and then step a]
				
[{"name":"SPACE POD","botImageName":"data.imgName","distance":200,
"speed":2,"travelTime":10,"totalUnits":{"original":2,"current":1},"error":true},
planetIndexArr":0,"vehicleIndexArr":0
{"name":"SPACE ROCKET","botImageName":"data.imgName","distance":300,
"speed":4,"travelTime":0,"totalUnits":{"original":1,"current":1},"error":true},
{"name":"SPACE SHUTTLE","botImageName":"data.imgName","distance":400,
"speed":5,"travelTime":0,"totalUnits":{"original":1,"current":1},"error":true},
{"name":"SPACE SHIP","botImageName":"data.imgName","distance":600,
"speed":10,"travelTime":0,"totalUnits":{"original":2,"current":2},"error":true}]
[{"0":[],"1":[],"2":[],"3":[]}]



*/

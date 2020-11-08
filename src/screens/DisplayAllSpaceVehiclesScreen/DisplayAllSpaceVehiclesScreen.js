import React, { useContext } from 'react';
import { Wrapper, BadgeWrapper, ImageWrapper, SolarSystemWrapper, SmallHeading, BigHeading } from './styles';
import { CustomButton } from '../../sharedComponents/CustomButton';
import { PlanetDetailsContext } from '../../context/appContext';
import uuid from 'react-uuid';

const DisplayAllSpaceVehiclesScreen = () => {
	const { planetCfg } = useContext(PlanetDetailsContext);
	const vehicleData  = planetCfg?.vehicleDat || JSON.parse(localStorage.getItem('planetCf'));

	return (
		<React.Fragment>
			<Wrapper>
				<BigHeading>Space Vehicles at King Shan's disposal</BigHeading>
				<SolarSystemWrapper>
					{vehicleData.map((data) => (
						<BadgeWrapper key={uuid()}>
							<ImageWrapper src={data.imgName} />
							<BigHeading>{data.name}</BigHeading>
							<SmallHeading>Units = {data.totalUnits}</SmallHeading>
							<SmallHeading>Max_distance = {data.distance} megamiles</SmallHeading>
							<SmallHeading>Speed = {data.speed} megamiles/hour</SmallHeading>
						</BadgeWrapper>
					))}
				</SolarSystemWrapper>
				<CustomButton redirectPath="/selectbots" leftpos="0vh" TextForButton="Select Space Bots" width="15vw" />
			</Wrapper>
		</React.Fragment>
	);
};

export default DisplayAllSpaceVehiclesScreen;

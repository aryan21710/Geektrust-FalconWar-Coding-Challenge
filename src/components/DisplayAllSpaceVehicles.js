import React from 'react';
import { Wrapper, BadgeWrapper, ImageWrapper, Heading, SolarSystemWrapper } from './common/StyledComponent';

import { SpaceBotImgArr } from '../customHooks/useDefineConstants';
import { CustomButton } from '../components/common/CustomButton';

const DisplayAllSpaceVehicles = () => {
	const [Spacebot1, Spacebot2, Spacebot3, Spacebot4] = SpaceBotImgArr;

	return (
		<React.Fragment>
			<Wrapper flexDirection="column">
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					Space Vehicles at King Shan's disposal
				</Heading>
				<SolarSystemWrapper height="65vh" width="100vw" flexDirection="row">
					<BadgeWrapper height="50vh" flexDirection="column">
						<ImageWrapper
							rotateBy="25deg"
							objectFit="none"
							borderRad="0px"
							width="30vw"
							height="40vh"
							marginBottom="3vh"
							src={Spacebot1}
						/>
						<Heading fontSize="1.2rem" color="#FAD107">
							SPACE ROCKET
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Units = 1
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Max_distance = 300 megamiles
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Speed = 4 megamiles/hour
						</Heading>
					</BadgeWrapper>{' '}
					<BadgeWrapper height="50vh" flexDirection="column">
						<ImageWrapper
							rotateBy="25deg"
							objectFit="none"
							borderRad="0px"
							width="30vw"
							height="40vh"
							marginBottom="3vh"
							src={Spacebot2}
						/>
						<Heading fontSize="1.2rem" color="#FAD107">
							SPACE POD
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Units = 2
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Max_distance = 200 megamiles
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Speed = 2 megamiles/hour
						</Heading>
					</BadgeWrapper>{' '}
					<BadgeWrapper height="50vh" flexDirection="column">
						<ImageWrapper
							rotateBy="25deg"
							objectFit="none"
							borderRad="0px"
							width="30vw"
							height="40vh"
							marginBottom="3vh"
							src={Spacebot3}
						/>
						<Heading fontSize="1.2rem" color="#FAD107">
							SPACE SHIP
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Units = 2
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Max_distance = 600 megamiles
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Speed = 10 megamiles/hour
						</Heading>
					</BadgeWrapper>{' '}
					<BadgeWrapper height="50vh" flexDirection="column">
						<ImageWrapper
							rotateBy="25deg"
							objectFit="none"
							borderRad="0px"
							width="30vw"
							height="40vh"
							marginBottom="3vh"
							src={Spacebot4}
						/>
						<Heading fontSize="1.2rem" color="#FAD107">
							SPACE SHUTTLE
						</Heading>
						<Heading color="white" fontSize="0.8rem">
							Units = 1
						</Heading>
						<Heading color="white" fontSize="0.8rem">
							Max_distance = 400 megamiles
						</Heading>
						<Heading color="white" fontSize="0.8rem">
							Speed = 5 megamiles/hour
						</Heading>
					</BadgeWrapper>
				</SolarSystemWrapper>
				<CustomButton redirectPath="/selectbots" leftpos="0vh" TextForButton="Select Space Bots" width="15vw" />
			</Wrapper>
		</React.Fragment>
	);
};

export default DisplayAllSpaceVehicles;

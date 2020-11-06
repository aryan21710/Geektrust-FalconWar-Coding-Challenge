import React, { useContext } from 'react';
import {
	Wrapper,
	BadgeWrapper,
	ImageWrapper,
	ButtonWrapper,
	Heading,
} from './common/StyledComponents/StyledCommonComp';
import { useFetchDataFromBackend } from '../customHooks/useFetchDataFromBackend';
import { ImageBadges } from '../customHooks/useDefineConstants';
import { PlanetDetailsContext } from '../context/appContext';
import { CustomButton } from '../components/common/CustomButton';
import uuid from 'react-uuid';

const LandingPage = () => {
	const { planetCfg, setPlanetCfg, apiError, setApiError } = useContext(PlanetDetailsContext);
	useFetchDataFromBackend(planetCfg, setPlanetCfg, apiError, setApiError);

	return (
		<React.Fragment>
			<Wrapper>
				{Object.keys(ImageBadges).map((image) => (
					<BadgeWrapper key={uuid()} flexDirection="column">
						<ImageWrapper marginBottom="3vh" src={ImageBadges[image]} />
						<Heading fontSize="1.5rem" color="#FAD107">
							{image}
						</Heading>
					</BadgeWrapper>
				))}

				<ButtonWrapper>
					<Heading color="white" fontSize="1.2rem" fontFamily="Avenir">
						Queen Al Falcone is now in hiding. But if King Shan can find her before the years are up, she
						will be exiled for another 15 years…
					</Heading>
					<CustomButton
						disabled={Object.keys(apiError).length === 0 ? false : true}
						redirectPath="/selectplanets"
						leftpos="0vh"
						opacity={Object.keys(apiError).length === 0 ?  1 : 0.6}
						TextForButton="Lets Find Falcone"
					/>
				</ButtonWrapper>
			</Wrapper>
		</React.Fragment>
	);
};

export default LandingPage;

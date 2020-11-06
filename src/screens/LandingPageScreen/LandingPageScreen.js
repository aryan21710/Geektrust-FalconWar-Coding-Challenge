import React, { useContext } from 'react';
import {
	Wrapper,
	BadgeWrapper,
	ImageWrapper,
	ButtonWrapper,
	SmallHeading,
	BigHeading
} from './styles.js';
import { useFetchDataFromBackend } from '../../customHooks/useFetchDataFromBackend';
import { ImageBadges } from '../../customHooks/useDefineConstants';
import { PlanetDetailsContext } from '../../context/appContext';
import { CustomButton } from '../../components/CustomButton';
import uuid from 'react-uuid';

const LandingPageScreen = () => {
	const { planetCfg, setPlanetCfg, apiError, setApiError } = useContext(PlanetDetailsContext);
	useFetchDataFromBackend(planetCfg, setPlanetCfg, apiError, setApiError);

	return (
		<React.Fragment>
			<Wrapper>
				{Object.keys(ImageBadges).map((image) => (
					<BadgeWrapper key={uuid()}>
						<ImageWrapper src={ImageBadges[image]} />
						<BigHeading>
							{image}
						</BigHeading>
					</BadgeWrapper>
				))}

				<ButtonWrapper>
					<SmallHeading>
						Queen Al Falcone is now in hiding. But if King Shan can find her before the years are up, she
						will be exiled for another 15 years…
					</SmallHeading>
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

export default LandingPageScreen;

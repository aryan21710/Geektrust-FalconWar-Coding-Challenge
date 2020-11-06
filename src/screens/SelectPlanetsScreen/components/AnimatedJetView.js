import React from 'react';
import { AnimatedJetWrapper, AnimatedMiniJet, BigHeading } from '../styles';
import { useSpring } from 'react-spring';
import {  MinijetImage } from '../../../customHooks/useDefineConstants';

 const AnimatedJetView = ({ moveToDisplayVehiclePage,animPlanetCnt }) => {
	const { Minijet } = MinijetImage;

	const jetAnimatedProp = useSpring({
		transform: animPlanetCnt >= 4 ? 'translateX(104vw)' : 'translateX(0vw)',
		delay: 700,
		config: { mass: 1, tension: 280, friction: 50 },
	});
	return (
		<AnimatedJetWrapper style={jetAnimatedProp}>
			<BigHeading color="#FAD107" fontSize="1rem">
				Select Space Vehicle
			</BigHeading>
			<AnimatedMiniJet onClick={moveToDisplayVehiclePage} src={Minijet} />
		</AnimatedJetWrapper>
	);
};

export default AnimatedJetView;
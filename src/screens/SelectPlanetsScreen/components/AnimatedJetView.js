import React from 'react';
import { AnimatedJetWrapper, AnimatedMiniJet, SmallHeading } from '../styles';
import { useSpring } from 'react-spring';
import {  MinijetImage } from '../../../customHooks/useDefineConstants';
import PropTypes from 'prop-types';

 const AnimatedJetView = ({ moveToDisplayVehiclePage,animPlanetCnt }) => {
	const { Minijet } = MinijetImage;

	const jetAnimatedProp = useSpring({
		transform: animPlanetCnt >= 4 ? 'translateX(104vw)' : 'translateX(0vw)',
		delay: 700,
		config: { mass: 1, tension: 280, friction: 50 },
	});
	return (
		<AnimatedJetWrapper style={jetAnimatedProp}>
			<SmallHeading fontFamily="Nasalisation" color="#FAD107" fontSize="1rem">
				Select Space Vehicle
			</SmallHeading>
			<AnimatedMiniJet onClick={moveToDisplayVehiclePage} src={Minijet} />
		</AnimatedJetWrapper>
	);
};

export default AnimatedJetView;

AnimatedJetView.propTypes = {
	moveToDisplayVehiclePage: PropTypes.func,
	animPlanetCnt: PropTypes.number
}
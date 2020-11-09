import React, { useState } from 'react';
import { Button, ButtonText, AnimatedMiniJet } from './styles';
import { useHistory } from 'react-router';
import { useSpring, config } from 'react-spring';
import { MinijetImage } from '../lib/constants';
import PropTypes from 'prop-types';

export const CustomButton = (props) => {
	const { redirectPath, leftpos, TextForButton, width, disabled, opacity } = props;
	const [isHover, setIshover] = useState(false);
	const animateJet = () => setIshover(true);
	const unAnimateJet = () => setIshover(false);
	const changePageOnClick = () => !disabled && history.push(`${redirectPath}`);
	const history = useHistory();
	const { Minijet } = MinijetImage;

	const jetAnimatedProp = useSpring({
		transform: isHover && !disabled ? 'translateX(6vw)' : 'translateX(-30vw)',
		config: config.stiff,
	});

	const btnTextProp = useSpring({
		opacity: isHover && !disabled ? 0 : 1,
		config: config.stiff,
	});

	return (
		<React.Fragment>
			<Button
				disabled={disabled}
				width={width}
				onMouseEnter={animateJet}
				onMouseLeave={unAnimateJet}
				onClick={changePageOnClick}
				opacity={opacity}
				id="redirectToNextPageBtn"
			>
				<AnimatedMiniJet id="CustomButton-MiniJetImg"leftpos={leftpos} style={jetAnimatedProp} src={Minijet} />
				<ButtonText style={btnTextProp}>{TextForButton}</ButtonText>
			</Button>
		</React.Fragment>
	);
};

CustomButton.propTypes = {
	redirectPath: PropTypes.string,
	leftpos: PropTypes.string,
	TextForButton: PropTypes.string,
	width: PropTypes.string,
	disabled: PropTypes.bool,
	opacity: PropTypes.number,
};

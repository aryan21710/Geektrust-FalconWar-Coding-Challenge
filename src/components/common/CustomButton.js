import React, { useState } from 'react';
import { Button, ButtonText, AnimatedMiniJet } from '../common/StyledComponent';
import { useHistory } from 'react-router';
import { useSpring, config } from 'react-spring';
import { MinijetImage } from '../../customHooks/useDefineConstants';

export const CustomButton = (props) => {
	const { redirectPath, leftpos, TextForButton, width, disabled } = props;
	const [isHover, setIshover] = useState(false);
	const animateJet = () => setIshover(true);
	const unAnimateJet = () => setIshover(false);
	const changePageOnClick = () => !disabled && history.push(`${redirectPath}`);
	const history = useHistory();
	const { Minijet } = MinijetImage;

	const jetAnimatedProp = useSpring({
		transform: isHover ? 'translateX(6vw)' : 'translateX(-30vw)',
		config: config.stiff,
	});

	const btnTextProp = useSpring({
		opacity: isHover ? 0 : 1,
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
			>
				<AnimatedMiniJet leftpos={leftpos} style={jetAnimatedProp} src={Minijet} />
				<ButtonText style={btnTextProp}>{TextForButton}</ButtonText>
			</Button>
		</React.Fragment>
	);
};

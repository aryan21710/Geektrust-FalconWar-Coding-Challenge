import React from 'react';
import { ButtonHeading } from '../styles';

 const ResetPlanetBtnView = ({ onResetPlanet }) => {
	return (
		<React.Fragment>
			<ButtonHeading onClick={onResetPlanet}>
				Reset Planets
			</ButtonHeading>
		</React.Fragment>
	);
};

export default ResetPlanetBtnView;

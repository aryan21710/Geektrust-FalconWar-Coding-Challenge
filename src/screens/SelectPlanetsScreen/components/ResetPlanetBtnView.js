import React from 'react';
import { ButtonHeading } from '../styles';
import PropTypes from 'prop-types';

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


ResetPlanetBtnView.propTypes = {
	onResetPlanet: PropTypes.func,
}

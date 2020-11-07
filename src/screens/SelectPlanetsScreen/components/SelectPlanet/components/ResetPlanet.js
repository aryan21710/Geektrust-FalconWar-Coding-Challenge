import React from 'react';
import { ButtonHeading } from '../../../styles';
import PropTypes from 'prop-types';

 const ResetPlanet= ({ onResetPlanet }) => {
	return (
		<React.Fragment>
			<ButtonHeading onClick={onResetPlanet}>
				Reset Planets
			</ButtonHeading>
		</React.Fragment>
	);
};

export default ResetPlanet ;


ResetPlanet.propTypes = {
	onResetPlanet: PropTypes.func,
}

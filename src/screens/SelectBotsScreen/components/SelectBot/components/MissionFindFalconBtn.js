import React from 'react';
import { CustomButton } from '../../../../../sharedComponents/CustomButton';
import PropTypes from 'prop-types';

 const MissionFindFalconBtn= ({ finalData }) => {
	return (
		<CustomButton
			redirectPath="/displayfinalresult"
			disabled={finalData.planet_names.length === 4 ? false : true}
			leftpos="0vh"
			width="15vw"
			TextForButton="Mission Find Falcone"
			opacity={finalData.planet_names.length === 4 ? 1 : 0.6}
		/>
	);
};

export default MissionFindFalconBtn;

MissionFindFalconBtn.propTypes = {
	finalData: PropTypes.arrayOf(PropTypes.object),
};


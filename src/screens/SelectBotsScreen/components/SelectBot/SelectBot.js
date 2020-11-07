import React from 'react';
import { MissionFindFalconBtn, PlanetAndTravelTime, SelectBotHeader} from '../..';
import { SelectedPlanetWrapper, SolarSystemWrapper } from '../../styles';
import PropTypes from 'prop-types';

const SelectBot= (props) => {
	const { planetAndBotsData, finalData, onRadioChange } = props;
	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="75vh" justifyContent="space-evenly">
				<SelectBotHeader/>
				<PlanetAndTravelTime planetAndBotsData={planetAndBotsData} onRadioChange={onRadioChange}/>
			</SolarSystemWrapper>
			<MissionFindFalconBtn finalData={finalData}/>
		</SelectedPlanetWrapper>
	);
};
export default SelectBot;

SelectBot.propTypes = {
	finalData: PropTypes.arrayOf(PropTypes.object),
	planetAndBotsData: PropTypes.arrayOf(PropTypes.object),
	onRadioChange: PropTypes.func
};


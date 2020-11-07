import React from 'react';
import { MissionFindFalconBtn, PlanetAndTravelTime, SelectBotHeader} from '../..';
import { SelectedPlanetWrapper, SolarSystemWrapper } from '../../styles';
import PropTypes from 'prop-types';

const SelectBot= (props) => {
	const { planetAndBotsData, dataToFetchFinalResult, onRadioChange } = props;
	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="75vh" justifyContent="space-evenly">
				<SelectBotHeader/>
				<PlanetAndTravelTime planetAndBotsData={planetAndBotsData} onRadioChange={onRadioChange}/>
			</SolarSystemWrapper>
			<MissionFindFalconBtn dataToFetchFinalResult={dataToFetchFinalResult}/>
		</SelectedPlanetWrapper>
	);
};
export default SelectBot;

SelectBot.propTypes = {
	dataToFetchFinalResult: PropTypes.arrayOf(PropTypes.object),
	planetAndBotsData: PropTypes.arrayOf(PropTypes.object),
	onRadioChange: PropTypes.func
};


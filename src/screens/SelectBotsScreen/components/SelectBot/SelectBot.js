import React from 'react';
import { MissionFindFalconBtn, PlanetAndTravelTime, SelectBotHeader} from '../..';
import { SelectedPlanetWrapper, SolarSystemWrapper } from '../../styles';
import PropTypes from 'prop-types';

const SelectBot= (props) => {
	const { planetAndBotsData, dataToFetchFinalResult, onDropDownChange } = props;
	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="75vh" justifyContent="space-evenly">
				<SelectBotHeader/>
				<PlanetAndTravelTime planetAndBotsData={planetAndBotsData} onDropDownChange={onDropDownChange}/>
			</SolarSystemWrapper>
			<MissionFindFalconBtn dataToFetchFinalResult={dataToFetchFinalResult}/>
		</SelectedPlanetWrapper>
	);
};
export default SelectBot;

SelectBot.propTypes = {
	dataToFetchFinalResult: PropTypes.object,
	planetAndBotsData: PropTypes.arrayOf(PropTypes.object),
	onDropDownChange: PropTypes.func
};


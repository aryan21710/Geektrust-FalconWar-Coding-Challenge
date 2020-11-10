import React from 'react';
import { MissionFindFalconBtn, PlanetAndTravelTime, SelectBotHeader } from '../..';
import { SelectedPlanetWrapper, SolarSystemWrapper } from '../../styles';
import PropTypes from 'prop-types';

const SelectBot = (props) => {
	const {
		planetAndBotsData,
		dataToFetchFinalResult,
		onDropDownChange,
		planetIndexArr,
		vehicleIndex,
		vehicleName,
		planetIndex
	} = props;
	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="75vh" justifyContent="space-evenly">
				<SelectBotHeader />
				<PlanetAndTravelTime
					planetAndBotsData={planetAndBotsData}
					onDropDownChange={onDropDownChange}
					planetIndexArr={planetIndexArr}
					vehicleIndex={vehicleIndex}
					vehicleName={vehicleName}
					planetIndex={planetIndex}
				/>
			</SolarSystemWrapper>
			<MissionFindFalconBtn dataToFetchFinalResult={dataToFetchFinalResult} />
		</SelectedPlanetWrapper>
	);
};
export default SelectBot;

SelectBot.propTypes = {
	planetAndBotsData: PropTypes.array,
	dataToFetchFinalResult: PropTypes.object,
	onDropDownChange: PropTypes.func,
	planetIndexArr: PropTypes.array,
	vehicleIndex: PropTypes.number,
	vehicleName: PropTypes.string,
	planetIndex: PropTypes.number
};

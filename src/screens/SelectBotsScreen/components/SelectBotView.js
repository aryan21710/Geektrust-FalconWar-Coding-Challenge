import React from 'react';
import { ButtonView, PlanetAndTravelTimeView, HeadingView } from './';
import { SelectedPlanetWrapper, SolarSystemWrapper } from '../styles';

const SelectBotView = (props) => {
	const { planetAndBotsData, finalData, onRadioChange } = props;
	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="75vh" justifyContent="space-evenly">
				<HeadingView />
				<PlanetAndTravelTimeView planetAndBotsData={planetAndBotsData} onRadioChange={onRadioChange}/>
			</SolarSystemWrapper>
			<ButtonView finalData={finalData}/>
		</SelectedPlanetWrapper>
	);
};
export default SelectBotView;

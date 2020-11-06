import React from 'react';
import { SolarSystemView, SelectedPlanetView, ResetPlanetBtnView, AnimatedJetView } from './index';
import { SelectedPlanetWrapper, SolarSystemWrapper } from '../styles';

export const SelectPlanetView = (props) => {
	const {
		moveToDisplayVehiclePage,
		planetDataUsedForRender,
		animateSelectedPlanet,
		selectedPlanet,
		onResetPlanet,
        onChangePlanetSelection,
        animPlanetCnt
	} = props;
	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="90vh" justifyContent="space-evenly">
				<AnimatedJetView animPlanetCnt={animPlanetCnt} moveToDisplayVehiclePage={moveToDisplayVehiclePage}/>
				<SolarSystemView planetDataUsedForRender={planetDataUsedForRender} animateSelectedPlanet={animateSelectedPlanet}/>
				<SelectedPlanetView selectedPlanet={selectedPlanet} onChangePlanetSelection={onChangePlanetSelection}/>
				<ResetPlanetBtnView onResetPlanet={onResetPlanet}/>
			</SolarSystemWrapper>
		</SelectedPlanetWrapper>
	);
};

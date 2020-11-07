import React from 'react';
import { SolarSystemView, SelectedPlanetView, ResetPlanetBtnView, AnimatedJetView } from '../index';
import { SelectedPlanetWrapper, SolarSystemWrapper } from '../../styles';
import PropTypes from 'prop-types';

export const SelectPlanetView = (props) => {
	const {
		moveToDisplayVehiclePage,
		planetDataUsedForRender,
		animateSelectedPlanet,
		selectedPlanet,
		onResetPlanet,
		onChangePlanetSelection,
		animPlanetCnt,
	} = props;
	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="90vh" justifyContent="space-evenly">
				<AnimatedJetView animPlanetCnt={animPlanetCnt} moveToDisplayVehiclePage={moveToDisplayVehiclePage} />
				<SolarSystemView
					planetDataUsedForRender={planetDataUsedForRender}
					animateSelectedPlanet={animateSelectedPlanet}
				/>
				<SelectedPlanetView selectedPlanet={selectedPlanet} onChangePlanetSelection={onChangePlanetSelection} />
				<ResetPlanetBtnView onResetPlanet={onResetPlanet} />
			</SolarSystemWrapper>
		</SelectedPlanetWrapper>
	);
};

SelectPlanetView.propTypes = {
	moveToDisplayVehiclePage: PropTypes.func,
	planetDataUsedForRender: PropTypes.arrayOf(PropTypes.object),
	animateSelectedPlanet: PropTypes.func,
	selectedPlanet: PropTypes.arrayOf(PropTypes.object),
	onResetPlanet: PropTypes.func,
	onChangePlanetSelection: PropTypes.func,
	animPlanetCnt: PropTypes.number,
};

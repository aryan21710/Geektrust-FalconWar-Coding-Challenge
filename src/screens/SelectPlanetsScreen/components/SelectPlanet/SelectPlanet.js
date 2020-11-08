import React from 'react';
import { SolarSystem, PlanetSelectedToInvade, ResetPlanet, AnimatedJet} from '../index';
import { SelectedPlanetWrapper, SolarSystemWrapper } from '../../styles';
import PropTypes from 'prop-types';

export const SelectPlanet= (props) => {
	const {
		moveToDisplayVehiclePage,
		planetDataUsedForRender,
		onClickSolarSysPlanet,
		selectedPlanet,
		onResetPlanet,
		onChangePlanetSelection,
		animPlanetCnt,
	} = props;
	return (
		<SelectedPlanetWrapper justifyContent="center">
			<SolarSystemWrapper height="90vh" justifyContent="space-evenly">
				<AnimatedJet animPlanetCnt={animPlanetCnt} moveToDisplayVehiclePage={moveToDisplayVehiclePage} />
				<SolarSystem
					planetDataUsedForRender={planetDataUsedForRender}
					onClickSolarSysPlanet={onClickSolarSysPlanet}
				/>
				<PlanetSelectedToInvade selectedPlanet={selectedPlanet} onChangePlanetSelection={onChangePlanetSelection} />
				<ResetPlanet onResetPlanet={onResetPlanet} />
			</SolarSystemWrapper>
		</SelectedPlanetWrapper>
	);
};

SelectPlanet.propTypes = {
	moveToDisplayVehiclePage: PropTypes.func,
	planetDataUsedForRender: PropTypes.arrayOf(PropTypes.object),
	onClickSolarSysPlanet: PropTypes.func,
	selectedPlanet: PropTypes.arrayOf(PropTypes.object),
	onResetPlanet: PropTypes.func,
	onChangePlanetSelection: PropTypes.func,
	animPlanetCnt: PropTypes.number,
};

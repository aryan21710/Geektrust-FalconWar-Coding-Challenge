import React, { useState, useContext, useEffect } from 'react';
import { myCustomHooks } from '../../customHooks';
import { PlanetDetailsContext } from '../../context/appContext';
import { useHistory } from 'react-router';
import { PlanetImageArr } from '../../customHooks/useDefineConstants';
import { SelectPlanet } from './components/SelectPlanet/SelectPlanet';
import {
	createPlanetCordToDisplay,
	updatePlanetSelectionData,
	updateSelectedPlanetDataForAnim,
	reduceOpacityOfPlanetInSolarSystem,
	applyAnimForSelecPlanet,
	stopPlanetAnim,
} from './services';
import { DATATOANIMSELECTEDPLANET, PLANETANDBOTSDATA } from '../../constants';

const SelectedPlanetsScreen = () => {
	const { useFetchDataFromBackend, useSelectedPlanetDataTOHandleAnim } = myCustomHooks;
	const {
		planetCfg,
		setPlanetCfg,
		selectedPlanet,
		setSelectedPlanet,
		setSelecPlanetCount,
		apiError,
		setApiError,
	} = useContext(PlanetDetailsContext);
	const history = useHistory();

	const { planetData } = planetCfg;

	useFetchDataFromBackend(planetCfg, setPlanetCfg, apiError, setApiError);
	useSelectedPlanetDataTOHandleAnim(setSelectedPlanet, selectedPlanet, planetData);

	const [planetDataUsedForRender, setPlanetDataUsedForRender] = useState([]);
	const [indexOfSelectedPlanet, setIndexOfSelectedPlanet] = useState(-1);
	const [values, setValues] = useState(PLANETANDBOTSDATA);

	const {  planetindex, animPlanetCnt, planetNameArr } = values;

	useEffect(() => {
		planetData &&
			planetDataUsedForRender.length === 0 &&
			setPlanetDataUsedForRender([...createPlanetCordToDisplay(planetData, PlanetImageArr)]);
	}, [planetDataUsedForRender, planetData]);

	useEffect(() => {
		planetindex > -1 &&
			updateSelectedPlanetDataForAnim(values, selectedPlanet, indexOfSelectedPlanet, setSelectedPlanet);
	}, [planetindex]);

	useEffect(() => {
		indexOfSelectedPlanet > -1
			? disableAnimPostPlanetSelection()
			: reduceOpacityOfPlanetInSolarSystem(
					planetDataUsedForRender,
					planetNameArr,
					indexOfSelectedPlanet,
					setPlanetDataUsedForRender
			  );
	}, [indexOfSelectedPlanet]);

	useEffect(() => {
		if (animPlanetCnt === 0) {
			setValues(PLANETANDBOTSDATA);
			setSelectedPlanet(DATATOANIMSELECTEDPLANET);
		} else if (animPlanetCnt === 4) {
			setSelecPlanetCount(animPlanetCnt);
		}
	}, [animPlanetCnt]);

	useEffect(() => {
		planetNameArr.length === 0 &&
			reduceOpacityOfPlanetInSolarSystem(
				planetDataUsedForRender,
				planetNameArr,
				indexOfSelectedPlanet,
				setPlanetDataUsedForRender
			);
	}, [planetNameArr]);

	const disableAnimPostPlanetSelection = () => {
		const _ = selectedPlanet.map((planetData, idx) => {
			if (idx === animPlanetCnt - 1) {
				return {
					...planetData,
					isAnimated: false,
					imgname: planetData.imgname,
					opacity: idx === indexOfSelectedPlanet ? 0.3 : 1,
				};
			} else {
				return {
					...planetData,
					isAnimated: false,
					imgname: planetData.imgname,
					opacity: indexOfSelectedPlanet > -1 && idx === indexOfSelectedPlanet ? 0.3 : 1,
				};
			}
		});
		indexOfSelectedPlanet > -1 &&
			reduceOpacityOfPlanetInSolarSystem(
				planetDataUsedForRender,
				planetNameArr,
				indexOfSelectedPlanet,
				setPlanetDataUsedForRender
			);
		setSelectedPlanet(_);
	};

	const isPlanetAlreadySelected = (planetname) =>
		selectedPlanet.some((planetData) => planetData.planetname === planetname);

	const animateSelectedPlanet = (e) => {
		const { planetname, planetindex, imgname, distance } = e.target.dataset;
		if (isPlanetAlreadySelected(planetname)) {
			alert('PLANET ALREADY SELECTED.. PLEASE SELECT SOME OTHER PLANET');
		} else {
			if (indexOfSelectedPlanet > -1) {
				applyAnimForSelecPlanet(
					values,
					setValues,
					setIndexOfSelectedPlanet,
					selectedPlanet,
					indexOfSelectedPlanet,
					setSelectedPlanet,
					e.target.dataset
				);
			} else if (animPlanetCnt <= 3 && indexOfSelectedPlanet === -1) {
				setValues({
					...values,
					animPlanetCnt: animPlanetCnt + 1,
					planetindex: parseInt(planetindex),
					distance,
					planetname,
					imgname,
					planetNameArr: [...planetNameArr, planetname],
				});
			} else if (animPlanetCnt > 3 && indexOfSelectedPlanet === -1) {
				stopPlanetAnim();
			}
		}
	};

	const moveToDisplayVehiclePage = () => {
		updatePlanetSelectionData(animPlanetCnt, selectedPlanet, setSelectedPlanet);
		history.push(`/displayallspacevehicles`);
	};

	const onResetPlanet = () => {
		setValues({ ...values, animPlanetCnt: 0, planetNameArr: [], planetname: '' });
		setIndexOfSelectedPlanet(-1);
	};

	const onChangePlanetSelection = (e) => {
		if (!planetNameArr.includes(e.target.dataset.selectedplanetname)) {
			setValues({ ...values, planetNameArr: [...planetNameArr, e.target.dataset.selectedplanetname] });
		}
		setIndexOfSelectedPlanet(parseInt(e.target.dataset.planetidx));
	};

	return (
		<React.Fragment>
			<SelectPlanet
				moveToDisplayVehiclePage={moveToDisplayVehiclePage}
				planetDataUsedForRender={planetDataUsedForRender}
				animateSelectedPlanet={animateSelectedPlanet}
				selectedPlanet={selectedPlanet}
				onResetPlanet={onResetPlanet}
				onChangePlanetSelection={onChangePlanetSelection}
				animPlanetCnt={animPlanetCnt}
			/>
		</React.Fragment>
	);
};

export default SelectedPlanetsScreen;

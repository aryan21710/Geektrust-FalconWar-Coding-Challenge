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
	planetAnimPostSwapForSelecPlan,
	stopPlanetAnim,
} from './services';
import { DEFAULTDATATOANIMSELECTEDPLANET, DEFAULTPLANETANDBOTSDATA } from '../../constants';

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

	/* idxOfSelecPlanForSwap:-INDEX OF PLANET WHICH IS IN LOWER REGION . THIS ONLY GETS INCREMENTED WHEN PLANET IS
	SELECTED OR CLICKED TO SWAP OTHERWISE STAYS AT -1.
	*/
	const [idxOfSelecPlanForSwap, setIdxOfSelecPlanForSwap] = useState(-1);
	const [values, setValues] = useState(DEFAULTPLANETANDBOTSDATA);
	const { animPlanetCnt, planetNameArr } = values;
	 
	useEffect(() => {
		planetData &&
			planetDataUsedForRender.length === 0 &&
			setPlanetDataUsedForRender([...createPlanetCordToDisplay(planetData, PlanetImageArr)]);
	}, [planetDataUsedForRender, planetData]);

	useEffect(() => {
		idxOfSelecPlanForSwap > -1
			? disableAnimPostPlanetSelection()
			: reduceOpacityOfPlanetInSolarSystem(
					planetDataUsedForRender,
					planetNameArr,
					idxOfSelecPlanForSwap,
					setPlanetDataUsedForRender
			  );
	}, [idxOfSelecPlanForSwap]);

	useEffect(() => {
		if (animPlanetCnt === 0) {
			setValues(DEFAULTPLANETANDBOTSDATA);
			setSelectedPlanet(DEFAULTDATATOANIMSELECTEDPLANET);
		} else {
			updateSelectedPlanetDataForAnim(values, selectedPlanet, idxOfSelecPlanForSwap, setSelectedPlanet,setSelecPlanetCount);
		}
	}, [animPlanetCnt]);

	useEffect(() => {
		planetNameArr.length === 0 &&
			reduceOpacityOfPlanetInSolarSystem(
				planetDataUsedForRender,
				planetNameArr,
				idxOfSelecPlanForSwap,
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
					opacity: idx === idxOfSelecPlanForSwap ? 0.3 : 1,
				};
			} else {
				return {
					...planetData,
					isAnimated: false,
					imgname: planetData.imgname,
					opacity: idxOfSelecPlanForSwap > -1 && idx === idxOfSelecPlanForSwap ? 0.3 : 1,
				};
			}
		});
		idxOfSelecPlanForSwap > -1 &&
			reduceOpacityOfPlanetInSolarSystem(
				planetDataUsedForRender,
				planetNameArr,
				idxOfSelecPlanForSwap,
				setPlanetDataUsedForRender
			);
		setSelectedPlanet(_);
	};

	const isPlanetAlreadySelected = (planetname) =>
		selectedPlanet.some((planetData) => planetData.planetname === planetname);

	const onClickSolarSysPlanet = (e) => {
		const { planetname, planetindex, imgname, distance } = e.target.dataset;
		if (isPlanetAlreadySelected(planetname)) {
			alert('PLANET ALREADY SELECTED.. PLEASE SELECT SOME OTHER PLANET');
		} else {
			if (idxOfSelecPlanForSwap > -1) {
				planetAnimPostSwapForSelecPlan(
					values,
					setValues,
					setIdxOfSelecPlanForSwap,
					selectedPlanet,
					idxOfSelecPlanForSwap,
					setSelectedPlanet,
					e.target.dataset
				);
			} else if (animPlanetCnt <= 4 && idxOfSelecPlanForSwap === -1) {
				setValues({
					...values,
					animPlanetCnt: animPlanetCnt + 1,
					planetindex: parseInt(planetindex),
					distance,
					planetname,
					imgname,
					planetNameArr: [...planetNameArr, planetname],
				});
			} else if (animPlanetCnt > 4 && idxOfSelecPlanForSwap === -1) {
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
		setIdxOfSelecPlanForSwap(-1);
	};

	// onChangePlanetSelection:- PLANET CLICKED ON LOWER REGION OF ANIMATED PLANETS
	const onChangePlanetSelection = (e) => {
		if (!planetNameArr.includes(e.target.dataset.selectedplanetname)) {
			setValues({ ...values, planetNameArr: [...planetNameArr, e.target.dataset.selectedplanetname] });
		}
		setIdxOfSelecPlanForSwap(parseInt(e.target.dataset.planetidx));
	};

	return (
		<React.Fragment>
			<SelectPlanet
				moveToDisplayVehiclePage={moveToDisplayVehiclePage}
				planetDataUsedForRender={planetDataUsedForRender}
				onClickSolarSysPlanet={onClickSolarSysPlanet}
				selectedPlanet={selectedPlanet}
				onResetPlanet={onResetPlanet}
				onChangePlanetSelection={onChangePlanetSelection}
				animPlanetCnt={animPlanetCnt}
			/>
		</React.Fragment>
	);
};

export default SelectedPlanetsScreen;

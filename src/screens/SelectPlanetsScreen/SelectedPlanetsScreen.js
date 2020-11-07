import React, { useState, useContext, useEffect } from 'react';
import { myCustomHooks } from '../../customHooks';
import { PlanetDetailsContext } from '../../context/appContext';
import { useHistory } from 'react-router';
import { PlanetImageArr } from '../../customHooks/useDefineConstants';
import { SelectPlanet} from './components/SelectPlanet/SelectPlanet';
import {
	createPlanetCordToDisplay,
	updatePlanetSelectionData,
	updateSelectedPlanetDataForAnim,
	reduceOpacityOfPlanetInSolarSystem,
	applyAnimForSelecPlanet,
	stopPlanetAnim
} from './services';
import {DATATOANIMSELECTEDPLANET} from '../../constants';

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

	const [animPlanetCnt, setAnimPlanetCnt] = useState(0);
	const [planetDataUsedForRender, setPlanetDataUsedForRender] = useState([]);
	const [planetindex, setPlanetIndex] = useState(-1);
	const [selectedplanetnames, setSelectedplanetnames] = useState([]);
	const [planetname, setPlanetName] = useState([]);
	const [planetImgName, setPlanetImageName] = useState('');
	const [distance, setDistance] = useState(0);
	const [indexOfSelectedPlanet, setIndexOfSelectedPlanet] = useState(-1);

	useEffect(() => {
		planetData &&
			planetDataUsedForRender.length === 0 &&
			setPlanetDataUsedForRender([...createPlanetCordToDisplay(planetData, PlanetImageArr)]);
	}, [planetDataUsedForRender, planetData]);

	useEffect(() => {
		planetindex > -1 &&
			updateSelectedPlanetDataForAnim(
				planetindex,
				animPlanetCnt,
				selectedPlanet,
				indexOfSelectedPlanet,
				setSelectedPlanet,
				planetImgName,
				planetname,
				distance
			);
	}, [planetindex]);

	useEffect(() => {
		indexOfSelectedPlanet > -1
			? disableAnimPostPlanetSelection()
			: reduceOpacityOfPlanetInSolarSystem(
					planetDataUsedForRender,
					selectedplanetnames,
					indexOfSelectedPlanet,
					setPlanetDataUsedForRender
			  );
	}, [indexOfSelectedPlanet]);

	useEffect(() => {
		if (animPlanetCnt === 0) {
			setPlanetIndex(-1);
			setSelectedplanetnames('');
			setDistance('');
			setPlanetName('');
			setSelectedPlanet(DATATOANIMSELECTEDPLANET);
		} else if (animPlanetCnt === 4) {
			setSelecPlanetCount(animPlanetCnt);
		}
	}, [animPlanetCnt]);

	useEffect(() => {
		selectedplanetnames.length === 0 &&
			reduceOpacityOfPlanetInSolarSystem(
				planetDataUsedForRender,
				selectedplanetnames,
				indexOfSelectedPlanet,
				setPlanetDataUsedForRender
			);
	}, [selectedplanetnames]);

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
				selectedplanetnames,
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
					selectedplanetnames,
					setSelectedplanetnames,
					setIndexOfSelectedPlanet,
					selectedPlanet,
					indexOfSelectedPlanet,
					imgname,
					planetname,
					distance,
					planetindex,
					setSelectedPlanet
				);
			} else if (animPlanetCnt <= 3 && indexOfSelectedPlanet === -1) {
				setAnimPlanetCnt(animPlanetCnt + 1);
				setPlanetIndex(parseInt(planetindex));
				setDistance(distance);
				setPlanetName(planetname);
				setPlanetImageName(imgname);
				setSelectedplanetnames([...selectedplanetnames, planetname]);
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
		setAnimPlanetCnt(0);
		setIndexOfSelectedPlanet(-1);
		setSelectedplanetnames([]);
		setPlanetName('');
	};

	const onChangePlanetSelection = (e) => {
		if (!selectedplanetnames.includes(e.target.dataset.selectedplanetname)) {
			setSelectedplanetnames([...selectedplanetnames, e.target.dataset.selectedplanetname]);
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

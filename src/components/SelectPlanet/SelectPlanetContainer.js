import React, { useState, useContext, useEffect } from 'react';
import { useSpring } from 'react-spring';
import { myCustomHooks } from '../../customHooks';
import { PlanetDetailsContext } from '../../context/appContext';
import { useHistory } from 'react-router';
import { PlanetImageArr, MinijetImage } from '../../customHooks/useDefineConstants';
import { SelectPlanetView } from './SelectPlanetView';
import { createPlanetCordToDisplay,updatePlanetSelectionData } from '../../common/util';


const SelectPlanetContainer = () => {
	const { useFetchDataFromBackend,useSelectedPlanetDataTOHandleAnim } = myCustomHooks;
	const { planetCfg, setPlanetCfg, selectedPlanet, setSelectedPlanet, setSelecPlanetCount } = useContext(
		PlanetDetailsContext
	);
	const history = useHistory();

	const { Minijet } = MinijetImage;
	const { planetData } = planetCfg;

	useFetchDataFromBackend(planetCfg, setPlanetCfg);
	useSelectedPlanetDataTOHandleAnim(setSelectedPlanet, selectedPlanet,planetData);

	const [animPlanetCnt, setAnimPlanetCnt] = useState(0);
	const [planetDataUsedForRender, setPlanetDataUsedForRender] = useState([]);
	const [planetindex, setPlanetIndex] = useState(-1);
	const [selectedplanetnames, setSelectedplanetnames] = useState([]);
	const [planetname, setPlanetName] = useState([]);
	const [planetImgName, setPlanetImageName] = useState('');
	const [distance, setDistance] = useState(0);
	const [indexOfSelectedPlanet, setIndexOfSelectedPlanet] = useState(-1);

	useEffect(() => {
		planetDataUsedForRender.length === 0 && setPlanetDataUsedForRender([...createPlanetCordToDisplay(planetData, PlanetImageArr)]);
	}, [planetDataUsedForRender]);

	const jetAnimatedProp = useSpring({
		transform: animPlanetCnt >= 4 ? 'translateX(104vw)' : 'translateX(0vw)',
		delay: 700,
		config: { mass: 1, tension: 280, friction: 50 },
	});

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
		indexOfSelectedPlanet > -1 && reduceOpacityOfPlanetInSolarSystem();
		setSelectedPlanet(_);
	};

	const updateSelectedPlanetDataForAnim = () => {
		if (planetindex > -1 && animPlanetCnt <= 4) {
			const updatedSelectedPlanet = selectedPlanet.map((selecPlanData, idx) => {
				if (idx === animPlanetCnt - 1) {
					return {
						isAnimated: true,
						imgname: planetImgName,
						index: animPlanetCnt - 1,
						planetname,
						distance,
						opacity: idx === indexOfSelectedPlanet ? 0.3 : 1,
					};
				} else if (selecPlanData.isAnimated && idx !== animPlanetCnt - 1) {
					return {
						...selecPlanData,
						isAnimated: false,
						opacity: indexOfSelectedPlanet > -1 && idx === indexOfSelectedPlanet ? 0.3 : 1,
					};
				} else {
					return {
						...selecPlanData,
						isAnimated: false,
						opacity: indexOfSelectedPlanet > -1 && idx === indexOfSelectedPlanet ? 0.3 : 1,
					};
				}
			});
			setSelectedPlanet(updatedSelectedPlanet);
		}
	};

	useEffect(() => {
		planetindex > -1 && updateSelectedPlanetDataForAnim();
	}, [planetindex]);

	useEffect(() => {
		indexOfSelectedPlanet > -1 ? disableAnimPostPlanetSelection() : reduceOpacityOfPlanetInSolarSystem();
	}, [indexOfSelectedPlanet]);

	useEffect(() => {
		if (animPlanetCnt === 0) {
			setPlanetIndex(-1);
			setSelectedplanetnames('');
			setDistance('');
			setPlanetName('');
			setSelectedPlanet(
				Array(6)
					.fill('')
					.map(() => ({
						isAnimated: false,
						imgname: '',
						index: -1,
						planetname: '',
						distance: '',
					}))
			);
		} else if (animPlanetCnt === 4) {
			setSelecPlanetCount(animPlanetCnt);
		}
	}, [animPlanetCnt]);

	useEffect(() => {
		selectedplanetnames.length === 0 && reduceOpacityOfPlanetInSolarSystem();
	}, [selectedplanetnames]);

	const isPlanetAlreadySelected = (planetname) =>
		selectedPlanet.some((planetData) => planetData.planetname === planetname);

	const animateSelectedPlanet = (e) => {
		const { planetname, planetindex, imgname, distance } = e.target.dataset;
		if (isPlanetAlreadySelected(planetname)) {
			alert('PLANET ALREADY SELECTED.. PLEASE SELECT SOME OTHER PLANET');
		} else {
			if (indexOfSelectedPlanet > -1) {
				applyAnimForSelecPlanet(imgname, planetname, distance, planetindex);
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
		// animPlanetCnt = 4 && indexOfSelectedPlanet === -1 calling the stopPlanetAnim during planet selection
	};

	const applyAnimForSelecPlanet = (...args) => {
		const [newPlanetImgNameToSwap, newPlanetNameToSwap, newDistanceToSwap, newIndexToSwap]=args;
		let oldPlanetName = '';
		const _ = selectedPlanet.map((planet) => {
			if (planet.index === indexOfSelectedPlanet) {
				oldPlanetName = planet.planetname;
				console.log(`applyAnimForSelecPlanet ${planet.imgname}::${newPlanetImgNameToSwap}`);
				return {
					...planet,
					imgname: newPlanetImgNameToSwap,
					planetname: newPlanetNameToSwap,
					distance: newDistanceToSwap,
					index: newIndexToSwap,
					isAnimated: true,
					opacity: 1,
				};
			} else {
				return {
					...planet,
					isAnimated: false,
				};
			}
		});

		const updatedSelecPlanetNames = selectedplanetnames.map((data) =>
			data === oldPlanetName ? newPlanetNameToSwap : data
		);
		console.log(`applyAnimForSelecPlanet ${JSON.stringify(_, null, 4)}`);
		setSelectedPlanet(_);
		setIndexOfSelectedPlanet(-1);
		setSelectedplanetnames(updatedSelecPlanetNames);
	};

	const moveToDisplayVehiclePage = () =>  {
		updatePlanetSelectionData(animPlanetCnt, selectedPlanet, setSelectedPlanet)
		history.push(`/displayallspacevehicles`);
	}

	const onResetPlanet = () => {
		setAnimPlanetCnt(0);
		setIndexOfSelectedPlanet(-1);
		setSelectedplanetnames([]);
		setPlanetName('');
	};

	const reduceOpacityOfPlanetInSolarSystem = () => {
		const planetDataWithReducedOpacity = planetDataUsedForRender.map((planet) => {
			return selectedplanetnames.includes(planet.planetname)
				? {
						...planet,
						opacity: indexOfSelectedPlanet > -1 ? 0.3 : 1,
				  }
				: {
						...planet,
						opacity: 1,
				  };
		});
		setPlanetDataUsedForRender(planetDataWithReducedOpacity);
	};

	const onChangePlanetSelection = (e) => {
		if (!selectedplanetnames.includes(e.target.dataset.selectedplanetname)) {
			setSelectedplanetnames([...selectedplanetnames, e.target.dataset.selectedplanetname]);
		}
		setIndexOfSelectedPlanet(parseInt(e.target.dataset.planetidx));
	};

	const stopPlanetAnim = () =>
		alert('4 PLANETS ALREADY SELECTED. IF YOU WANT TO RESET THE SELECTION CLICK ON RESET PLANETS.');

	return (
		<React.Fragment>
			<SelectPlanetView
				jetAnimatedProp={jetAnimatedProp}
				moveToDisplayVehiclePage={moveToDisplayVehiclePage}
				Minijet={Minijet}
				planetDataUsedForRender={planetDataUsedForRender}
				animateSelectedPlanet={animateSelectedPlanet}
				selectedPlanet={selectedPlanet}
				onResetPlanet={onResetPlanet}
				onChangePlanetSelection={onChangePlanetSelection}
			/>
		</React.Fragment>
	);
};

export default SelectPlanetContainer;
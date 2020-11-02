import React, { useState, useContext, useEffect } from 'react';
import { useSpring } from 'react-spring';
import { useFetchDataFromBackend } from '../../customHooks/useFetchDataFromBackend';
import { PlanetDetailsContext } from '../../context/appContext';
import { useHistory } from 'react-router';
import { createPlanetCordToDisplay } from '../../common/util';
import { PlanetImageArr, MinijetImage } from '../../customHooks/useDefineConstants';
import { SelectPlanetView } from './SelectPlanetView';

const SelectPlanetContainer = () => {
	const { planetCfg, setPlanetCfg, selectedPlanet, setSelectedPlanet, setSelecPlanetCount } = useContext(
		PlanetDetailsContext
	);
	const history = useHistory();

	useFetchDataFromBackend(planetCfg, setPlanetCfg);
	const { Minijet } = MinijetImage;
	const { planetData } = planetCfg;

	const [animPlanetCnt, setAnimPlanetCnt] = useState(0);
	const [planetDataUsedForRender, setPlanetDataUsedForRender] = useState([]);
	const [planetindex, setPlanetIndex] = useState(-1);
	const [selectedplanetnames, setSelectedplanetnames] = useState([]);
	const [planetname, setPlanetName] = useState([]);
	const [planetImgName, setPlanetImageName] = useState('');
	const [distance, setDistance] = useState(0);
	const [indexOfSelectedPlanet, setIndexOfSelectedPlanet] = useState(-1);

	const jetAnimatedProp = useSpring({
		transform: animPlanetCnt >= 4 ? 'translateX(104vw)' : 'translateX(0vw)',
		delay: 700,
		config: { mass: 1, tension: 280, friction: 50 },
	});

	useEffect(() => {
		planetData.length > 0 && setPlanetDataUsedForRender([...createPlanetCordToDisplay(planetData, PlanetImageArr)]);
	}, [planetData]);

	const disableAnimPostPlanetSelection = () => {
		const _ = selectedPlanet.map((planetData, idx) => {
			if (idx === animPlanetCnt - 1) {
				return {
					...planetData,
					isAnimated: false,
					imgname: planetImgName,
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
			const updatedSelectedPlanet = selectedPlanet.map((planetData, idx) => {
				if (idx === animPlanetCnt - 1) {
					return {
						isAnimated: true,
						imgname: planetImgName,
						index: animPlanetCnt - 1,
						planetname,
						distance,
						opacity: idx === indexOfSelectedPlanet ? 0.3 : 1,
					};
				} else if (planetData.isAnimated && idx !== animPlanetCnt - 1) {
					return {
						isAnimated: false,
						imgname: planetData.imgname,
						index: planetData.index,
						planetname: planetData.planetname,
						distance: planetData.distance,
						opacity: indexOfSelectedPlanet > -1 && idx === indexOfSelectedPlanet ? 0.3 : 1,
					};
				} else {
					return {
						isAnimated: false,
						imgname: planetData.imgname,
						index: planetData.index,
						planetname: planetData.planetname,
						distance: planetData.distance,
						opacity: indexOfSelectedPlanet > -1 && idx === indexOfSelectedPlanet ? 0.3 : 1,
					};
				}
			});
			setSelectedPlanet(updatedSelectedPlanet);
		}
	};

	const addAnimationDataToSelectedPlanet = () => {
		const _ = planetData.map((planet) => ({
			...planet,
			isAnimated: false,
			imgname: '',
			index: -1,
			planetname: '',
			distance: '',
		}));
		setSelectedPlanet(_);
	};

	useEffect(() => {
		planetData.length > 0 && addAnimationDataToSelectedPlanet();
	}, []);

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
				updatePlanetSection(imgname, planetname);
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

	const updatePlanetSection = (newPlanetImgNameToSwap, newPlanetNameToSwap) => {
		console.log('updatePlanetSection', newPlanetNameToSwap);
		let oldImageName="";
		const _ = selectedPlanet.map((planet) => {
			if (planet.index === indexOfSelectedPlanet) {
				oldImageName=planet.planetname
				return {
					...planet,
					imgname: newPlanetImgNameToSwap,
					planetname: newPlanetNameToSwap,
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

		const updatedSelecPlanetNames=selectedplanetnames.map((data)=>data===oldImageName ? newPlanetNameToSwap : data);

		console.log(`updatePlanetSection ${JSON.stringify(updatedSelecPlanetNames, null, 4)}`);

		setSelectedPlanet(_);
		setIndexOfSelectedPlanet(-1);
		setSelectedplanetnames(updatedSelecPlanetNames);
	};

	const moveToDisplayVehiclePage = () => history.push(`/displayallspacevehicles`);

	const onResetPlanet = () => {
		setAnimPlanetCnt(0);
		setIndexOfSelectedPlanet(-1);
		setSelectedplanetnames([]);
		setPlanetName('');
	};

	const reduceOpacityOfPlanetInSolarSystem = () => {
		const planetDataWithReducedOpacity = planetDataUsedForRender.map((planet) => {
			if (selectedplanetnames.includes(planet.planetname)) {
				return {
					...planet,
					opacity: indexOfSelectedPlanet > -1 ? 0.3 : 1,
				};
			} else {
				return {
					...planet,
					opacity: 1,
				};
			}
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
				animPlanetCnt={animPlanetCnt}
				stopPlanetAnim={stopPlanetAnim}
				onChangePlanetSelection={onChangePlanetSelection}
				indexOfSelectedPlanet={indexOfSelectedPlanet}
				indexOfSelectedPlanet={indexOfSelectedPlanet}
			/>
		</React.Fragment>
	);
};

export default SelectPlanetContainer;

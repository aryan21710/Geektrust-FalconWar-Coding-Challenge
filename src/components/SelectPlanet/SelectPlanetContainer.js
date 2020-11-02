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
	const [updateSelectionIndex, setUpdateSelectionIndex] = useState(-1);

	const jetAnimatedProp = useSpring({
		transform: animPlanetCnt >= 4 ? 'translateX(104vw)' : 'translateX(0vw)',
		delay: 700,
		config: { mass: 1, tension: 280, friction: 50 },
	});

	useEffect(() => {
		planetData.length > 0 && setPlanetDataUsedForRender([...createPlanetCordToDisplay(planetData, PlanetImageArr)]);
	}, [planetData]);

	// planetindex default value is -1 and animPlanetCnt is 0. isAnimated is false and only
	// for planets for whom u want to perform animation set to true.
	const updateSelectedPlanetDataForAnim = () => {
		if (planetindex > -1 && animPlanetCnt <= 4) {
			const updatedSelectedPlanet = selectedPlanet.map((planetData, idx) => {
				if (idx === animPlanetCnt - 1) {
					if (updateSelectionIndex > -1) {
						return {
							isAnimated: false,
							imgname: planetImgName,
							index: animPlanetCnt - 1,
							planetname,
							distance,
							opacity: idx === updateSelectionIndex ? 0.3 : 1,
						};
					} else {
						return {
							isAnimated: true,
							imgname: planetImgName,
							index: animPlanetCnt - 1,
							planetname,
							distance,
							opacity: idx === updateSelectionIndex ? 0.3 : 1,
						};
					}
				} else if (planetData.isAnimated && idx !== animPlanetCnt - 1) {
					return {
						isAnimated: false,
						imgname: planetData.imgname,
						index: planetData.index,
						planetname: planetData.planetname,
						distance: planetData.distance,
						opacity: updateSelectionIndex > -1 && idx === updateSelectionIndex ? 0.3 : 1,
					};
				} else {
					return {
						isAnimated: false,
						imgname: planetData.imgname,
						index: planetData.index,
						planetname: planetData.planetname,
						distance: planetData.distance,
						opacity: updateSelectionIndex > -1 && idx === updateSelectionIndex ? 0.3 : 1,
					};
				}
			});
			if (updateSelectionIndex > -1) {
				reduceOpacityOfPlanetInSolarSystem();
				setSelectedPlanet(updatedSelectedPlanet);
			} else {
				setSelectedPlanet(updatedSelectedPlanet);
			}
		}
	};

	// const syncIdxInUpdatePlanetDataWithSelectedPlanet = () => {
	// 	const updatedSelectedPlanet = selectedPlanet.map((planet, idx) => {
	// 		if (planet.index > 0) {
	// 			return {
	// 				...planetDataUsedForRender[idx],
	// 				index: planet.index,
	// 			};
	// 		}
	// 	});
	// };

	const addAnimationDataToSelectedPlanet = () => {
		const _ = planetData.map((planet, idx) => {
			return {
				...planet,
				isAnimated: false,
				imgname: '',
				index: -1,
				planetname: '',
				distance: '',
			};
		});
		setSelectedPlanet(_);
	};

	useEffect(() => {
		planetData.length > 0 && addAnimationDataToSelectedPlanet();
	}, []);

	useEffect(() => {
		if (planetindex > -1 || updateSelectionIndex > -1) {
			updateSelectedPlanetDataForAnim();
		}
	}, [planetindex, updateSelectionIndex]);

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
			setAnimPlanetCnt(animPlanetCnt + 1);
			setPlanetIndex(planetindex);
			setDistance(distance);
			setPlanetName(planetname);
			setPlanetImageName(imgname);
			setSelectedplanetnames([...selectedplanetnames, planetname]);
		}
	};

	const updatePlanetSection = () => {
		/* onChangePlanetSelection should reduce the opacity of the planet in 
		SelectedPlanetImg first.
		set isAnimated to false for that index.
		once user clicks on new planet reduce its opacity also.


		reduce opacity of only those planet in src which can be selected.
		store the src index as updateSelection and dest index as the new planet index
		
		find the src index and dst index in selectedPlanet and swap them.

		*/
		// const _=selectedPlanet.map((planet)=>{
		// 	if (planet.index===updateSelectionIndex) {
		// 		return {
		// 			...planet,
		// 			// imgname: Minijet
		// 			// isAnimated: false,
		// 		}
		// 	} else {
		// 		return {
		// 			...planet
		// 		}
		// 	}
		// })
		// setSelectedPlanet(_)
	};

	const moveToDisplayVehiclePage = () => history.push(`/displayallspacevehicles`);

	const onResetPlanet = () => {
		setAnimPlanetCnt(0);
		setUpdateSelectionIndex(-1);
		setSelectedplanetnames([]);
		setPlanetName('');
	};

	const reduceOpacityOfPlanetInSolarSystem = () => {
		const planetDataWithReducedOpacity = planetDataUsedForRender.map((planet) => {
			if (selectedplanetnames.includes(planet.planetname)) {
				return {
					...planet,
					opacity: updateSelectionIndex > -1 ? 0.3 : 1,
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
		setUpdateSelectionIndex(parseInt(e.target.dataset.planetidx));
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
				updateSelectionIndex={updateSelectionIndex}
			/>
		</React.Fragment>
	);
};

export default SelectPlanetContainer;

/*

if u click on a planet --> calls animateSelectedPlanet
animateSelectedPlanet increments the animatePlanetCnt and
update planetIndex with the new planetIndex everytime new planet is
selected. Once planetIndex  updates it calls-->updateSelectedPlanetDataForAnim
updateSelectedPlanetDataForAnim 
	checks whether animPlanetCnt <=4 and planetindex is updated (planetindex > -1)
	it updates isAnimated to true to perform animation for that index and increments the value of index
	and updates the state variable selectedplanet which resides in approutes.

when user clicks on selected planet it calls ---> onChangePlanetSelection
this updates a state variable updateSelectionIndex and then calls --> updatePlanetSection


*/

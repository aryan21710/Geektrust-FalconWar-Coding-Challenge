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
	const [updatedPlanetData, setUpdatedPlanetData] = useState([]);
	const [planetindex, setPlanetIndex] = useState(-1);
	const [imgname, setImgname] = useState('');
	const [planetname, setPlanetName] = useState('');
	const [distance, setDistance] = useState(0);
	const [updateSelectionIndex, setUpdateSelectionIndex]=useState(-1)


	const jetAnimatedProp = useSpring({
		transform: animPlanetCnt >= 4 ? 'translateX(104vw)' : 'translateX(0vw)',
		delay: 700,
		config: { mass: 1, tension: 280, friction: 50 },
	});

	useEffect(() => {
		planetData.length > 0 && setUpdatedPlanetData([...createPlanetCordToDisplay(planetData, PlanetImageArr)]);
	}, [planetData]);


	// planetindex default value is -1 and animPlanetCnt is 0. isAnimated is false and only
	// for planets for whom u want to perform animation set to true.
	const updateSelectedPlanetDataForAnim = () => {
		if (planetindex > -1 && animPlanetCnt <= 4) {
			const updatedSelectedPlanet = selectedPlanet.map((planetData, idx) => {
				if (idx === animPlanetCnt - 1) {
					return {
						isAnimated: true,
						imgname,
						index: animPlanetCnt - 1,
						planetname,
						distance,
						opacity: updateSelectionIndex > -1 && idx===updateSelectionIndex ? 0.3 : 1
					};
				} else if (planetData.isAnimated && idx !== animPlanetCnt - 1) {
					return {
						isAnimated: false,
						imgname: planetData.imgname,
						index: planetData.index,
						planetname: planetData.planetname,
						distance: planetData.distance,
						opacity:  updateSelectionIndex > -1 && idx===updateSelectionIndex ? 0.3 : 1
					};
				} else {
					return {
						isAnimated: false,
						imgname: planetData.imgname,
						index: planetData.index,
						planetname: planetData.planetname,
						distance: planetData.distance,
						opacity: updateSelectionIndex > -1 && idx===updateSelectionIndex ? 0.3 : 1
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
		if (animPlanetCnt === 0) {
			setPlanetIndex(-1);
			setImgname('');
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

	useEffect(()=>{
		updateSelectionIndex > -1 && updateSelectedPlanetDataForAnim()
	},[updateSelectionIndex])

	const isPlanetAlreadySelected = (planetname) =>
		selectedPlanet.some((planetData) => planetData.planetname === planetname);

	const animateSelectedPlanet = (e) => {
		const { planetname, planetindex, imgname, distance } = e.target.dataset;
		if (isPlanetAlreadySelected(planetname)) {
			alert('PLANET ALREADY SELECTED.. PLEASE SELECT SOME OTHER PLANET');
		} else {
			setAnimPlanetCnt(animPlanetCnt + 1);
			setPlanetIndex(planetindex);
			setImgname(imgname);
			setDistance(distance);
			setPlanetName(planetname);
		}
	};


	const updatePlanetSection=()=>{
		/* onChangePlanetSelection should reduce the opacity of the planet in 
		SelectedPlanetImg first.
		set isAnimated to false for that index.
		once user clicks on new planet reduce its opacity also.
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
	}

	const moveToDisplayVehiclePage = () => history.push(`/displayallspacevehicles`);

	const onResetPlanet = () => {
		setAnimPlanetCnt(0);
		setUpdateSelectionIndex(-1);
	}

	const onChangePlanetSelection = (e) => setUpdateSelectionIndex(parseInt(e.target.dataset.planetidx));

	const stopPlanetAnim=()=>alert('4 PLANETS ALREADY SELECTED. IF YOU WANT TO RESET THE SELECTION CLICK ON RESET PLANETS.');

	return (
		<React.Fragment>
			<SelectPlanetView
				jetAnimatedProp={jetAnimatedProp}
				moveToDisplayVehiclePage={moveToDisplayVehiclePage}
				Minijet={Minijet}
				updatedPlanetData={updatedPlanetData}
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


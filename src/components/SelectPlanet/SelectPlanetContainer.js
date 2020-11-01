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
	const [updateSelection, setUpdateSelection]=useState(-1)


	const jetAnimatedProp = useSpring({
		transform: animPlanetCnt >= 4 ? 'translateX(104vw)' : 'translateX(0vw)',
		delay: 700,
		config: { mass: 1, tension: 280, friction: 50 },
	});

	useEffect(() => {
		planetData.length > 0 && setUpdatedPlanetData([...createPlanetCordToDisplay(planetData, PlanetImageArr)]);
	}, [planetData]);


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
					};
				} else if (planetData.isAnimated && idx !== animPlanetCnt - 1) {
					return {
						isAnimated: false,
						imgname: planetData.imgname,
						index: planetData.index,
						planetname: planetData.planetname,
						distance: planetData.distance,
					};
				} else {
					return {
						isAnimated: false,
						imgname: planetData.imgname,
						index: planetData.index,
						planetname: planetData.planetname,
						distance: planetData.distance,
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
		updateSelection > -1 && updatePlanetSection()
	},[updateSelection])

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
		const _=selectedPlanet.map((planet)=>{
			if (planet.index===updateSelection) {
				return {
					...planet,
					imgname: Minijet
				}
			} else {
				return {
					...planet
				}
			}
		})
		setSelectedPlanet(_)
	}

	const moveToDisplayVehiclePage = () => history.push(`/displayallspacevehicles`);

	const onResetPlanet = () => setAnimPlanetCnt(0);

	const onChangePlanetSelection = (e) => setUpdateSelection(parseInt(e.target.dataset.planetidx));

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
			/>
		</React.Fragment>
	);
};

export default SelectPlanetContainer;

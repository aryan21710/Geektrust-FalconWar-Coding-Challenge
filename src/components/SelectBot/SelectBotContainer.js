import React, { useContext, useState, useEffect } from 'react';
import SelectBotView from './SelectBotView';
import { PlanetDetailsContext } from '../../context/appContext';

const SelectBotContainer = () => {
	const { setFinalData, finalData } = useContext(PlanetDetailsContext);

	const [selectedPlanet, setSelectedPlanet] = useState({
		planetIndex: -1,
		planetValue: '',
	});
	const { planetIndex, planetValue } = selectedPlanet;
	const [planetAndBotsData, setPlanetAndBotsData] = useState([]);

	useEffect(() => {
		setPlanetAndBotsData(populatePlanetAndBotsData());
	}, []);

	const populatePlanetAndBotsData = () => {
		const filteredArrOfSelectedPlanet = JSON.parse(localStorage.getItem('selectedPlanet'));
		return filteredArrOfSelectedPlanet.map((data) => ({
            ...data,
            planetIdx: -1,
			finalStatus: false,
			vehicleDataArray: JSON.parse(localStorage.getItem('planetCfg')).map((data) => ({
				name: data.name,
				botImageName: "data.imgName",
				distance: data.distance,
				speed: data.speed,
                travelTime: 0,
				totalUnits: data.totalUnits,
				error: true,
			})),
		}));
    };

    useEffect(() => {
		setPlanetAndBotsData(populatePlanetAndBotsData());
	}, []);
    

    const updatePlanetIdx=()=>{
        const _=planetAndBotsData.map((data,idx)=>{
            if (idx===planetIndex) return ({
                ...data,
                planetIdx: planetIndex
            })

            return ({...data, planetIdx: -1})
        })

        setPlanetAndBotsData(_)
    }

    useEffect(()=>{
        planetIndex > -1 && calcTimeTravelAndBotsLeft()
    },[planetAndBotsData,planetIndex])

	useEffect(() => {
		if (planetValue.length > 0 && planetIndex > -1) {
            updatePlanetIdx()
		} else {
			setSelectedPlanet({
				planetIndex: -1,
				planetValue: '',
			});
		}
	}, [planetValue, planetIndex]);

    const calcTimeTravelAndBotsLeft = () => {
      
    }
    
    const onRadioChange=(planetidx)=>(e)=>{
        console.log(`onRadioChange ${e.target.value} :: ${planetidx}`)
          /* PLANETIDX = planetidx and vehicle = e.target.value IS SELECTED IN DROPDOWN.
                if planetDistance <= vehicleDistance && vehicleTotalUnits > 0
                    then 
                        vehicleTotalUnits=vehicleTotalUnits-1
                        calc travelTime
                    else 
                        travelTime=0;
                        vehicleTotalUnits=vehicleMaxUnits


                    

        
        */

        const updatedPlanetAndBotsData=planetAndBotsData[planetidx].vehicleDataArray.map((vehicleData,vehicleIdx)=>{
                if (vehicleData.name===e.target.value && parseInt(planetAndBotsData[planetidx].distance) <= vehicleData.distance && vehicleData.totalUnits > 0) {
                    return {
                        ...vehicleData,
                        totalUnits: vehicleData.totalUnits - 1,
                        travelTime: Math.round(planetAndBotsData[planetidx].distance / parseInt(vehicleData.speed)),
                    }
                } else {
                    return {
                        ...vehicleData,
                        totalUnits: vehicleData.totalUnits,
                        travelTime: 0,
                    }
                }

        })

        console.log(`updatedPlanetAndBotsData ${JSON.stringify(updatedPlanetAndBotsData,null,4)}`);

        const unchangedPlanetAndBotsData=planetAndBotsData.map((planetData,idx)=>{
            if (idx!==planetIndex) {
                return {...planetData}
            } else {
                return {updatedPlanetAndBotsData}
            }
        })

        setPlanetAndBotsData([...unchangedPlanetAndBotsData])
    }

	const onSelectedVehicleIdx = (e) => {
		e.preventDefault();
		setSelectedPlanet({
			planetIndex: parseInt(e.target.options[e.target.selectedIndex].dataset.index),
			planetValue: e.target.value,
		});
	};

	return (
		<React.Fragment>
			<SelectBotView
				planetAndBotsData={planetAndBotsData}
				onSelectedVehicleIdx={onSelectedVehicleIdx}
                finalData={finalData}
                onRadioChange={onRadioChange}
                planetIndex={planetIndex}
                planetValue={planetValue}
			/>
		</React.Fragment>
	);
};

export default SelectBotContainer;

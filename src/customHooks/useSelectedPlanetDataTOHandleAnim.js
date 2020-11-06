import React, { useEffect } from 'react';

export const useSelectedPlanetDataTOHandleAnim = (setSelectedPlanet, selectedPlanet, planetData) => {
	const updatedSelectedPlanet = planetData.map((data) => ({
        ...data,
		isAnimated: false,
		imgname: data.imgname,
		index: data.index,
		planetname: data.planetname,
		distance: data.distance,
		opacity: 1,
    }));
    useEffect(()=>{
        setSelectedPlanet(updatedSelectedPlanet);
    },[])
};
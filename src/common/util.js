export const createPlanetCordToDisplay=(planetData,PlanetImageArr)=>{
    const [Planet1, Planet2, Planet3, Planet4,  Planet5, Planet6]=PlanetImageArr;
    return planetData
    .map((_) => {
        return {
            distance: _.distance,
            planetname: _.name,
        };
    })
    .map((_, idx) => {
        switch (idx) {
            case 0: {
                return { ..._, imgName: Planet1, topPos: '10vh', leftpos: '0vw' };
            }
            case 1: {
                return { ..._, imgName: Planet2, topPos: '2vh', leftpos: '10vw' };
            }
            case 2: {
                return { ..._, imgName: Planet3, topPos: '18vh', leftpos: '10vw' };
            }
            case 3: {
                return { ..._, imgName: Planet4, topPos: '20vh', leftpos: '25vw' };
            }
            case 4: {
                return { ..._, imgName: Planet5, topPos: '15vh', leftpos: '40vw' };
            }
            case 5: {
                return { ..._, imgName: Planet6, topPos: '8vh', leftpos: '50vw' };
            }
            default:
                return {};
        }
    });

}
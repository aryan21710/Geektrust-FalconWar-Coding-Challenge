import React from 'react';
import {
    SelectedPlanetImg,
    BigHeading
} from '../styles';
import PropTypes from 'prop-types';


 const SelectedPlanetAnimBox = ({planet,idx,onChangePlanetSelection}) => {
    return (
        <React.Fragment>
            <BigHeading fontSize="1.3rem">{`Selected Planet - ${idx + 1}`}</BigHeading>
            <SelectedPlanetImg
                opacity={planet.opacity}
                imgname={planet.imgname}
                data-planetidx={idx}
                data-selectedplanetname={planet.planetname}
                onClick={onChangePlanetSelection}
            />
            <BigHeading>
                {planet.planetname}
            </BigHeading>
            <BigHeading fontSize="1rem">{`DISTANCE ${planet.distance} megamiles`}</BigHeading>
        </React.Fragment>
    );
}

export default SelectedPlanetAnimBox;

SelectedPlanetAnimBox.propTypes = {
    planet: PropTypes.object,
    idx: PropTypes.number,
    onChangePlanetSelection: PropTypes.func
}

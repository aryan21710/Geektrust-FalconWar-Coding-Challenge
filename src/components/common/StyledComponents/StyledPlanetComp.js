import styled, { keyframes } from 'styled-components';
import { animated } from 'react-spring';
import solarSystem from '../../../assets/images/sunWithOrbit.png';

export const SelectedPlanetWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	margin: 0;
	padding: 0;
	overflow: hidden;
	display: flex;
	justify-content: ${(props) => props.justifyContent || 'center'};
	align-items: center;
	flex-direction: column;
	@media (max-width: 768px) {
		flex-direction: column;
		height: 140vh;
		overflow-y: scroll;
	}
`;

export const SolarSystemWrapper = styled.div`
	display: flex;
	justify-content: ${(props) => props.justifyContent || 'center'};
	align-items: center;
	flex-direction: column;
	width: ${(props) => props.width || '80vw'};
	flex-direction: ${(props) => props.flexDirection || 'column'};
	height: ${(props) => props.height || '50vh'};
    z-index: 100;
	@media (max-width: 768px) {
		width: 100vw;
		height: 40vh;
	}
`;

export const SolarSystemImage = styled(animated.div)`
	cursor: pointer;
	width: 60vw;
	height: 30vh;
	background-image: url(${solarSystem});
	background-position: center;
	background-repeat: no-repeat;
	position: relative;
	z-index: 100;
	@media (max-width: 768px) {
		width: 90vw;
	}
`;

export const Planet = styled(animated.img)`
	width: ${(props) => props.width || '6vw'};
	object-fit: cover;
	cursor: pointer;
	position: absolute;
	opacity: ${(props) => props.opacity || 1};
	top: ${(props) => props.toppos || '10vh'};
	left: ${(props) => props.leftpos || '0vw'};
	z-index: 100;
	@media (max-width: 768px) {
		width: 90vw;
	}
`;

export const PlanetWrapper = styled.div`
	display: flex;
	width: 100vw;
	height: ${props=>props.height || "25vh"};
	justify-content: ${props=>props.justifyContent || "center"};
	flexDirection=> ${props=>props.flexDirection||"row"};
	@media (max-width: 768px) {
		width: 100vw;
		height: 80vh;
		flex-direction: column;
	}
`;

export const SelectedPlanet = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	height: 30vh;
	position: relative;
	overflow: hidden;
	@media (max-width: 768px) {
		width: 100vw;
		height: 55vh;
	}
`;

export const SelectedPlanetImg = styled(animated.div)`
	height: 12vh;
	width: 12vh;
	margin: ${props=>props.margin};
	opacity: ${props=>props.opacity || "1"};
	background-image: url(${(props) => props.imgname});
	background-position: center;
	background-repeat: no-repeat;
	background-size: 12vh 12vh;
	cursor: pointer;
	@media (max-width: 768px) {
		height: 10vh;
		width: 10vh;
	}
`;

const animateSelectedPlanet = keyframes`
    from {
      transform: translate(0vw);
    }
  
    to {
      transform: translate(30vw);
    }
  `;

export const UnAnimatedWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	height: 25vh;
	width: 100%;
	flex: 1;
	position: absolute;
	left: ${(props) => props.leftpos || '-30vw'};
	align-items: center;
	flex-direction: column;
	@media (max-width: 768px) {
		height: 10vh;
		width: 10vh;
	}
`;

export const AnimatedWrapper = styled(UnAnimatedWrapper)`
	animation: ${animateSelectedPlanet} 0.5s  ease-in-out forwards;
`;

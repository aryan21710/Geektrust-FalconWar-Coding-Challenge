import styled, { keyframes } from 'styled-components';
import { animated } from 'react-spring';
import solarSystem from '../../public/images/sunWithOrbit.png';

export const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	margin: 0;
	padding: 0;
	overflow: hidden;
	display: flex;
	justify-content: center;
	opacity: 1;
	z-index: 2;
	flex-direction: ${(props) => props.flexDirection || 'row'};
	@media (max-width: 768px) {
		flex-direction: column;
		height: 80vh;
	}
`;

export const HeaderWrapper = styled.div`
	width: 100vw;
	height: ${(props) => props.height || '10vh'};
	margin: 0;
	padding: 0;
	position: fixed;
	top: ${(props) => props.topPos || '0vh'};
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export const Heading = styled.h1`
	font-size: ${(props) => props.fontSize || '1.8rem'};
	color: ${(props) => props.color || 'white'};
	text-align: center;
	font-family: ${(props) => props.fontFamily || 'Nasalisation'};
	z-index: 1000;
	font-weight: 100;
	margin: 2.5px auto;
	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

export const BadgeWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	justify-content: ${(props) => props.justifyContent || 'center'};
	flex-direction: ${(props) => props.flexDirection || 'row'};
	height: ${(props) => props.height || '75vh'};
	width: ${(props) => props.width || '25vw'};
	flex: ${(props) => props.flex || '1'};
	z-index: 2;
	@media (max-width: 768px) {
		width: 100vw;
		height: 30vh;
	}
`;

export const ButtonWrapper = styled.div`
	width: 100vw;
	height: 20vh;
	position: absolute;
	bottom: 5vh;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
`;

export const ImageWrapper = styled.img`
	border-radius: ${(props) => props.borderRad || '50%'};
	margin-bottom: ${(props) => props.marginBottom || '0vh'};
	height: ${(props) => props.height || '30vh'};
	width: ${(props) => props.height || '30vh'};
	object-fit: ${(props) => props.objectFit || 'cover'};
	transform: rotate(${(props) => props.rotateBy || 'none'});
	@media (max-width: 768px) {
		height: 20vh;
		width: 20vh;
	}
`;

export const Button = styled.div`
	border-radius: 50px;
	padding: 0vh 2vw;
	font-size: 1.5rem;
	font-weight: 700;
	display: flex;
	font-family: Avenir;
	justify-content: center;
	align-items: center;
	color: white;
	outline: none;
	cursor: pointer;
	position: relative;
	margin: ${(props) => props.margin || '0 auto'};
	border: 0px solid transparent;
	overflow: hidden;
	width: ${(props) => props.width};
	background: linear-gradient(to bottom, #ffc810, #b43e00);
	@media (max-width: 768px) {
		padding: 0vh 2vw;
		font-size: 0.4rem;
		font-weight: 500;
		height: 6vh;
	}
`;

export const ButtonText = styled(animated.p)`
	font-size: 1.2rem;
	text-align: center;
`;

export const AnimatedJetWrapper = styled(animated.div)`
	width: ${(props) => props.width || '20vw'};
	height: ${(props) => props.height || '10vh'};
	position: absolute;
	top: 50vh;
	left: -25vw;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
`;

export const AnimatedMiniJet = styled(animated.img)`
	width: 50px;
	height: 20px;
	object-fit: cover;
	position: absolute;
	cursor: pointer;
	left: ${(props) => props.leftpos};
`;

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
	justify-content: space-around;
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
	background-image: url(${(props) => props.imgname});
	background-position: center;
	background-repeat: no-repeat;
	background-size: 12vh 12vh;
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
	animation: ${animateSelectedPlanet} 0.5s ease-in-out forwards;
`;

export const StaticWrapper = styled.div`
	position: relative;
	overflow: hidden;
	width: ${(props) => props.width || '25vw'};
`;

export const Select = styled.select`
	margin: 1.5vh 0 5vh 0;
	border-radius: 20px;
	padding: 0.5vh 2vw;
	background: white;
	color: white;
	outline: none;
	display: block;
	font-size: 0.8rem;
	font-family: sans-serif;
	color: black;
	line-height: 1;
	box-sizing: border-box;
	border: 1px solid #aaa;
	box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
	background-repeat: no-repeat, repeat;
	background-position: right 0.7em top 50%, 0 0;
	background-size: 0.65em auto, 100%;
`;

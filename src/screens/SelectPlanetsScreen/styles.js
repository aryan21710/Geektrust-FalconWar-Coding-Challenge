import styled, { keyframes } from 'styled-components';
import { Heading } from '../../components/common/StyledComponents/StyledCommonComp';
import { animated } from 'react-spring';
import solarSystem from '../../assets/images/sunWithOrbit.png';

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
	flex-direction: column;
	@media (max-width: 768px) {
		flex-direction: column;
		height: 80vh;
	}
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


export const BadgeWrapper = styled.div`
	display: flex;
	align-items: ${(props) => props.alignItems || 'center'};
	justify-content: ${(props) => props.justifyContent || 'center'};
	flex-direction: column;
	height: 50vh;
	width: ${(props) => props.width || '25vw'};
	flex: ${(props) => props.flex || '1'};
	flex-wrap: ${(props) => props.flexWrap};
	z-index: 2;
	@media (max-width: 768px) {
		width: 100vw;
		height: 30vh;
	}
`;

export const ImageWrapper = styled.img`
	border-radius: 0px;
	margin-bottom: 3vh;
	height: 40vh;
	width: 30vw;
	object-fit: none;
	transform: rotate(25deg);
	@media (max-width: 768px) {
		height: 20vh;
		width: 20vh;
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
export const SolarSystemWrapper = styled.div`
	display: flex;
	justify-content: ${(props) => props.justifyContent || 'center'};
	align-items: center;
	width: ${props=>props.width || "100vw"};
	flex-direction: column;
	height: ${props=>props.height || "40vh"};
	z-index: 100;
	@media (max-width: 768px) {
		width: 100vw;
		height: 40vh;
	}
`;

export const BigHeading = styled(Heading)`
	font-size: ${props=>props.fontSize || "1.3rem"};
	color: ${props=>props.color || "white"};
	text-align: center;
	font-family: "Avenir";
	z-index: 1000;
	font-weight: 100;
	margin: ${(props) => props.margin || '2.5px auto'};
	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

export const SmallHeading = styled(BigHeading)`
	font-size: ${props=>props.fontSize || "1.2rem"};
	color: ${props=>props.color || "#FAD107"};
	font-family: 'Avenir';
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

const animateSelectedPlanet = keyframes`
    from {
      transform: translate(0vw);
    }
  
    to {
      transform: translate(30vw);
    }
  `;

export const AnimatedWrapper = styled(UnAnimatedWrapper)`
	animation: ${animateSelectedPlanet} 0.5s  ease-in-out forwards;
`;

export const StaticWrapper = styled.div`
	position: relative;
	overflow: hidden;
	width: ${(props) => props.width || '25vw'};
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

export const ButtonHeading = styled(Heading)`
	position: absolute;
	bottom: 2vh;
	right: 5vw;
	font-style: italic;
	border-bottom: 2px solid white;
	padding: 0.5vh 0.5vw;
    cursor: pointer;
    font-size: 1.2rem;
    color: #FAD107;
`;

export const AnimatedMiniJet = styled(animated.img)`
	width: 50px;
	height: 20px;
	object-fit: cover;
	position: absolute;
	cursor: pointer;
	left: ${(props) => props.leftpos};
`;

export const SolarSystemImage = styled(animated.div)`
	cursor: pointer;
	width: 60vw;
	height: 30vh;
	margin: 1vh 0vw;
	background-image: url(${solarSystem});
	background-position: center;
	background-repeat: no-repeat;
	position: relative;
	z-index: 100;
	@media (max-width: 768px) {
		width: 90vw;
	}
`;

export const AnimatedJetWrapper = styled(animated.div)`
	width: ${(props) => props.width || '17vw'};
	height: ${(props) => props.height || '10vh'};
	position: absolute;
	top: 50vh;
	left: -25vw;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
`;
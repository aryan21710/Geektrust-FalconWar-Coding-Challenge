import styled from 'styled-components';
import { Heading } from '../../components/common/StyledComponents/StyledCommonComp';

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
	width: 100vw;
	flex-direction: row;
	height: 65vh;
    z-index: 100;
	@media (max-width: 768px) {
		width: 100vw;
		height: 40vh;
	}
`;

export const BigHeading = styled(Heading)`
	font-size: 1.2rem;
	color: '#FAD107';
	text-align: center;
	font-family: Nasalisation;
	z-index: 1000;
	font-weight: 100;
	margin: ${(props) => props.margin || '2.5px auto'};
	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

export const SmallHeading = styled(BigHeading)`
	font-size: ${props=>props.fontSize || "1rem"};
	color: ${props=>props.color || "#FAD107"};
	font-family: Nasalisation;
	
`;

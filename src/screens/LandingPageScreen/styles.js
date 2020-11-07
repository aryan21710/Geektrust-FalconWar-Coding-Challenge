import styled from 'styled-components';
import { Heading } from '../../components/common/styles';

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

export const BadgeWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: ${(props) => props.alignItems || 'center'};
	justify-content: ${(props) => props.justifyContent || 'center'};
	flex-direction: column;
	height: ${(props) => props.height || '75vh'};
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
	border-radius: ${(props) => props.borderRad || '50%'};
	margin-bottom: 3vh;
	height: ${(props) => props.height || '30vh'};
	width: ${(props) => props.height || '30vh'};
	object-fit: ${(props) => props.objectFit || 'cover'};
	transform: rotate(${(props) => props.rotateBy || 'none'});
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

export const BigHeading = styled(Heading)`
	font-size: 1.5rem;
	color: '#FAD107';
	text-align: center;
	font-family: ${(props) => props.fontFamily || 'Nasalisation'};
	z-index: 1000;
	font-weight: 100;
	margin: ${(props) => props.margin || '2.5px auto'};
	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

export const SmallHeading = styled(BigHeading)`
	font-size: 1.2rem;
	color: 'white';
	font-family: 'Avenir';
`;

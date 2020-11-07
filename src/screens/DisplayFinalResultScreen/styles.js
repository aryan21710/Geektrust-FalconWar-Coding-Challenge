import styled from 'styled-components';


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

export const Heading = styled.h1`
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
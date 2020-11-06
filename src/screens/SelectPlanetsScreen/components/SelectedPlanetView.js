import React from 'react';
import {
	PlanetWrapper,
	BigHeading,
	AnimatedWrapper,
	StaticWrapper,
	SelectedPlanet,
	UnAnimatedWrapper,
} from '../styles';
import uuid from 'react-uuid';
import { SelectedPlanetAnimBox } from '.';

 const SelectedPlanetView = ({ selectedPlanet,onChangePlanetSelection }) => {
	return (
		<React.Fragment>
			<BigHeading color="#FAD107">
				{`>>> Click On Selected Planet First And Then On New Planet to Update Planet Selection <<<`}
			</BigHeading>
			<PlanetWrapper>
				<SelectedPlanet>
					{selectedPlanet.map((planet, idx) => {
						if (planet.index >= 0 && planet.isAnimated) {
							return (
								<StaticWrapper key={uuid()} width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
									<AnimatedWrapper>
										<SelectedPlanetAnimBox onChangePlanetSelection={onChangePlanetSelection} idx={idx} planet={planet} />
									</AnimatedWrapper>
								</StaticWrapper>
							);
						} else if (!planet.isAnimated && planet.index >= 0) {
							return (
								<StaticWrapper key={uuid()} width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
									<UnAnimatedWrapper leftpos="0vw">
										<SelectedPlanetAnimBox onChangePlanetSelection={onChangePlanetSelection} idx={idx} planet={planet} />
									</UnAnimatedWrapper>
								</StaticWrapper>
							);
						} else {
							return (
								<StaticWrapper key={uuid()} width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
									<UnAnimatedWrapper>
										<SelectedPlanetAnimBox onChangePlanetSelection={onChangePlanetSelection} idx={idx} planet={planet} />
									</UnAnimatedWrapper>
								</StaticWrapper>
							);
						}
					})}
				</SelectedPlanet>
			</PlanetWrapper>
		</React.Fragment>
	);
};

export default SelectedPlanetView

import React from 'react';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	PlanetWrapper,
	SelectedPlanet,
	SelectedPlanetImg,
	SolarSystemImage,
	Heading,
	Planet,
	AnimatedWrapper,
	UnAnimatedWrapper,
	StaticWrapper,
	AnimatedMiniJet,
	AnimatedJetWrapper,
} from './../common/StyledComponent';
import uuid from 'react-uuid';

export const SelectPlanetView = ({
	jetAnimatedProp,
	moveToDisplayVehiclePage,
	Minijet,
	updatedPlanetData,
	animateSelectedPlanet,
	selectedPlanet,
}) => {
	const WrapperContent = ({planet,idx}) => {
		return (
			<React.Fragment>
				<Heading fontSize="1.3rem">{`Selected Planet - ${idx + 1}`}</Heading>
				<SelectedPlanetImg imgname={planet.imgname} />
				<Heading color="#FAD107" fontSize="1.2rem">
					{planet.planetname}
				</Heading>
				<Heading color="#FAD107" fontSize="1rem">{`DISTANCE ${planet.distance} megamiles`}</Heading>
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			<SelectedPlanetWrapper justifyContent="space-evenly">
				<AnimatedJetWrapper style={jetAnimatedProp}>
					<Heading color="#FAD107" fontSize="1rem">
						Select Space Vehicle
					</Heading>
					<AnimatedMiniJet onClick={moveToDisplayVehiclePage} src={Minijet} />
				</AnimatedJetWrapper>
				<SolarSystemWrapper height="45vh">
					<Heading fontFamily="Avenir" fontSize="1.2rem" color="#FAD107">
						King Shan has received intelligence that Al Falcone is in hiding in one of these 6 planets -
						DonLon, Enchai, Jebing, Sapir, Lerbin & Pingasor. <b>Choose 4 planets you’d like to Invade.</b>
					</Heading>
					<SolarSystemImage>
						{updatedPlanetData.map((_, idx) => {
							return (
								<Planet
									key={uuid()}
									onClick={animateSelectedPlanet}
									toppos={_.topPos}
									leftpos={_.leftpos}
									data-imgname={_.imgName}
									data-planetname={_.planetname}
									data-distance={_.distance}
									data-planetindex={idx}
									src={_.imgName}
								/>
							);
						})}
					</SolarSystemImage>
				</SolarSystemWrapper>
				<PlanetWrapper>
					<SelectedPlanet>
						{selectedPlanet.map((planet, idx) => {
							if (planet.index >= 0 && planet.isAnimated) {
								return (
									<StaticWrapper key={uuid()} width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
										<AnimatedWrapper>
											<WrapperContent idx={idx} planet={planet}/>
										</AnimatedWrapper>
									</StaticWrapper>
								);
							} else if (!planet.isAnimated && planet.index >= 0) {
								return (
									<StaticWrapper key={uuid()} width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
										<UnAnimatedWrapper leftpos="0vw">
											<WrapperContent idx={idx} planet={planet}/>
										</UnAnimatedWrapper>
									</StaticWrapper>
								);
							} else {
								return (
									<StaticWrapper key={uuid()} width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
										<UnAnimatedWrapper>
											<WrapperContent idx={idx} planet={planet}/>
										</UnAnimatedWrapper>
									</StaticWrapper>
								);
							}
						})}
					</SelectedPlanet>
				</PlanetWrapper>
			</SelectedPlanetWrapper>
		</React.Fragment>
	);
};

import React from 'react';
import {
	Heading,
	StaticWrapper,
	AnimatedMiniJet,
	AnimatedJetWrapper,
	ButtonHeading,
} from '../common/StyledComponents/StyledCommonComp';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	PlanetWrapper,
	SelectedPlanet,
	SelectedPlanetImg,
	SolarSystemImage,
	Planet,
	AnimatedWrapper,
	UnAnimatedWrapper,
} from '../common/StyledComponents/StyledPlanetComp';
import uuid from 'react-uuid';

export const SelectPlanetView = ({
	jetAnimatedProp,
	moveToDisplayVehiclePage,
	Minijet,
	planetDataUsedForRender,
	animateSelectedPlanet,
	selectedPlanet,
	onResetPlanet,
	onChangePlanetSelection
}) => {
	const WrapperContent = ({ planet, idx }) => {
		return (
			<React.Fragment>
				<Heading fontSize="1.3rem">{`Selected Planet - ${idx + 1}`}</Heading>
				<SelectedPlanetImg
					opacity={planet.opacity}
					imgname={planet.imgname}
					data-planetidx={idx}
					data-selectedplanetname={planet.planetname}
					onClick={onChangePlanetSelection}
				/>
				<Heading color="#FAD107" fontSize="1.2rem">
					{planet.planetname}
				</Heading>
				<Heading color="#FAD107" fontSize="1rem">{`DISTANCE ${planet.distance} megamiles`}</Heading>
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			<SelectedPlanetWrapper justifyContent="center">
				<SolarSystemWrapper height="90vh" justifyContent="space-evenly">
					<AnimatedJetWrapper style={jetAnimatedProp}>
						<Heading color="#FAD107" fontSize="1rem">
							Select Space Vehicle
						</Heading>
						<AnimatedMiniJet onClick={moveToDisplayVehiclePage} src={Minijet} />
					</AnimatedJetWrapper>
					<SolarSystemWrapper height="40vh">
						<Heading fontFamily="Avenir" fontSize="1.2rem" color="#FAD107">
							King Shan has received intelligence that Al Falcone is in hiding in one of these 6 planets -
							DonLon, Enchai, Jebing, Sapir, Lerbin & Pingasor.{' '}
							<b>Choose 4 planets you’d like to Invade.</b>
						</Heading>
						<SolarSystemImage>
							{planetDataUsedForRender.map((_, idx) => {
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
										opacity={_.opacity}
									/>
								);
							})}
						</SolarSystemImage>
					</SolarSystemWrapper>
					<Heading fontSize="1.2rem" color="#FAD107">
						{`>>> Click On Selected Planet First And Then On New Planet to Update Planet Selection <<<`}
					</Heading>
					<PlanetWrapper>
						<SelectedPlanet>
							{selectedPlanet.map((planet, idx) => {
								if (planet.index >= 0 && planet.isAnimated) {
									return (
										<StaticWrapper key={uuid()} width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
											<AnimatedWrapper>
												<WrapperContent idx={idx} planet={planet} />
											</AnimatedWrapper>
										</StaticWrapper>
									);
								} else if (!planet.isAnimated && planet.index >= 0) {
									return (
										<StaticWrapper key={uuid()} width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
											<UnAnimatedWrapper leftpos="0vw">
												<WrapperContent idx={idx} planet={planet} />
											</UnAnimatedWrapper>
										</StaticWrapper>
									);
								} else {
									return (
										<StaticWrapper key={uuid()} width={idx === 4 || idx === 5 ? '0vw' : '25vw'}>
											<UnAnimatedWrapper>
												<WrapperContent idx={idx} planet={planet} />
											</UnAnimatedWrapper>
										</StaticWrapper>
									);
								}
							})}
						</SelectedPlanet>
					</PlanetWrapper>
					<ButtonHeading onClick={onResetPlanet} fontSize="1.2rem" color="#FAD107">
						Reset Planets
					</ButtonHeading>
				</SolarSystemWrapper>
			</SelectedPlanetWrapper>
		</React.Fragment>
	);
};

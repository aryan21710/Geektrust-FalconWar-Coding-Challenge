import React from 'react';
import { SolarSystemWrapper, BigHeading, SolarSystemImage, Planet } from '../styles';
import uuid from 'react-uuid';

 const SolarSystemView = ({ planetDataUsedForRender, animateSelectedPlanet }) => {
	return (
		<SolarSystemWrapper width="85vw">
			<BigHeading color="#FAD107">
				King Shan has received intelligence that Al Falcone is in hiding in one of these 6 planets - DonLon,
				Enchai, Jebing, Sapir, Lerbin & Pingasor. <b>Choose 4 planets you’d like to Invade.</b>
			</BigHeading>
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
	);
};

export default SolarSystemView;
import React from 'react';
import { SolarSystemWrapper, BigHeading, SolarSystemImage, Planet } from '../../../styles';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';

 const SolarSystem= ({ planetDataUsedForRender, onClickSolarSysPlanet }) => {
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
							onClick={onClickSolarSysPlanet}
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

export default SolarSystem;

SolarSystem.propTypes = {
	planetDataUsedForRender: PropTypes.arrayOf(PropTypes.object),
	onClickSolarSysPlanet: PropTypes.func,
};


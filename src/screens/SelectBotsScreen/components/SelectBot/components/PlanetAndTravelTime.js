import React from 'react';
import { PlanetWrapper, BadgeWrapper, SelectedPlanetImg,Select, SmallHeading } from '../../../styles';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';

 const PlanetAndTravelTime= ({ planetAndBotsData, onDropDownChange }) => {
	return (
		<PlanetWrapper>
			{planetAndBotsData.map(({ planetIndexArr, planetname, imgname, distance, vehicleDataArray }, idx) => (
				<BadgeWrapper key={uuid()}>
					<SelectedPlanetImg imgname={imgname} />
					<SmallHeading fontSize="1.2rem">{planetname}</SmallHeading>
					<SmallHeading>{`DISTANCE ${distance} megamiles`}</SmallHeading>
					<Select
						name="planetName"
						// planetvalue is common to all that is why same value is getting reflected everywhere.
						value={
							planetIndexArr.includes(idx) ? planetAndBotsData[idx].planetValue : 'Choose A Space Vehicle'
						}
						onChange={onDropDownChange}
					>
						{!planetIndexArr.includes(idx) && (
							<option key={uuid()} defaultValue="Choose A Space Vehicle">
								Choose A Space Vehicle
							</option>
						)}
						{vehicleDataArray.map((vehicleData, vehicleidx) => (
							<option
								key={uuid()}
								data-planetidx={idx}
								data-vehicleidx={vehicleidx}
								value={vehicleData.name}
							>
								{`${vehicleData.name} (${vehicleData.totalUnits.current})`}
							</option>
						))}
					</Select>
					<SmallHeading>
						{planetAndBotsData[idx].travelTime > 0
							? `Time Taken:- ${planetAndBotsData[idx].travelTime}`
							: `Time Taken:- 0`}
					</SmallHeading>
				</BadgeWrapper>
			))}
		</PlanetWrapper>
	);
};

export default PlanetAndTravelTime ;

PlanetAndTravelTime.propTypes = {
	planetAndBotsData: PropTypes.arrayOf(PropTypes.object),
	onDropDownChange: PropTypes.func
};


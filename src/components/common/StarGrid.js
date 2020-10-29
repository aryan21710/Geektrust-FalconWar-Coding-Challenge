import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';

export const StarGrid = () => {
	const [selectRandomStar, setSelectRandomStar] = useState(0);
	const noOfStarGrid = Array.from({ length: 100 }, (v, idx) => idx);
	const classNameForStarGrid = window.innerWidth > 768 ? 'gridForBigScreen' : 'gridForSmallScreen';

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setSelectRandomStar(Math.floor(Math.random() * 100));
	// 	}, 1000);
	// }, [selectRandomStar]);

	return (
		<React.Fragment>
			{noOfStarGrid.map((_, idx) => {
				return idx === selectRandomStar ? (
					<div key={uuid()} className={`${classNameForStarGrid} `}>
						<div className="star animateStar"></div>
					</div>
				) : (
					<div key={uuid()} className={`${classNameForStarGrid}`}>
						<div className="star"></div>
					</div>
				);
			})}
		</React.Fragment>
	);
};

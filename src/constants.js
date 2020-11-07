export const UNITSANDTRAVELTIMEDATA = Array(4).fill({
	name: '',
	botImageName: '',
	distance: '',
	speed: '',
	travelTime: 0,
	totalUnits: {
		original: -1,
		current: -1,
	},
	error: false,
	planetIndexArr: [],
	vehicleIndexArr: [],
});

export const DATATOANIMSELECTEDPLANET = Array(6)
	.fill('')
	.map(() => ({
		isAnimated: false,
		imgname: '',
		index: -1,
		planetname: '',
		distance: '',
	}));

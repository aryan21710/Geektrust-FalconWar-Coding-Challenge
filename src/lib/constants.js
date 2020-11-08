import Planet1 from '../assets/images/1.png';
import Planet2 from '../assets/images/2.png';
import Planet3 from '../assets/images/3.png';
import Planet4 from '../assets/images/4.png';
import Planet5 from '../assets/images/5.png';
import Planet6 from '../assets/images/6.png';
import KingShan from '../assets/images/modiji.png';
import ALFALCONE from '../assets/images/xi jhi.png';
import Minijet from '../assets/images/minijet.png';
import SpaceRocket from '../assets/images/Spaceship1.png';
import SpacePod from '../assets/images/spaceship2.png';
import SpaceShip from '../assets/images/Spaceship3.png';
import SpaceShuttle from '../assets/images/spaceship4.png';

export const PlanetImageArr = [Planet1, Planet2, Planet3, Planet4, Planet5, Planet6];

export const ImageBadges = {
	KingShan,
	ALFALCONE,
};

export const MinijetImage = {
	Minijet,
};

export const SpaceBotImgArr = [SpacePod, SpaceRocket, SpaceShuttle, SpaceShip];
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

export const DEFAULTDATATOANIMSELECTEDPLANET = Array(6)
	.fill('')
	.map(() => ({
		isAnimated: false,
		imgname: '',
		index: -1,
		planetname: '',
		distance: '',
	}));

export const DEFAULTPLANETANDBOTSDATA = {
	planetname: '',
	planetindex: -1,
	imgname: '',
	distance: 0,
	animPlanetCnt: 0,
	planetNameArr: [],
};

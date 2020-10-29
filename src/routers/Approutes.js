import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PlanetDetailsContext } from '../context/appContext';
import { PlanetImageArr, SpaceBotImgArr } from '../customHooks/useDefineConstants';
import { useUpdatedPlanetAndBotsData } from '../customHooks/useUpdatedPlanetAndBotsData';
import { StarGrid } from '../components/common/StarGrid';

// *** LAZY LOAD ALL COMPONENTS FOR FASTER PAGE LOAD ***
const LandingPage = lazy(() => import('../components/LandingPage'));
const Header = lazy(() => import('../components/common/Header'));
const Footer = lazy(() => import('../components/common/Footer'));
const SelectPlanet = lazy(() => import('../components/SelectPlanet'));
const SelectBots = lazy(() => import('../components/Selectbots'));
const DisplayAllSpaceVehicles = lazy(() => import('../components/DisplayAllSpaceVehicles'));
const DisplayFinalResult = lazy(() => import('../components/DisplayFinalResult'));

class DebugRouter extends Router {
	constructor(props) {
		super(props);
		this.history.listen((location, action) => {
			console.log(`The current URL is ${location.pathname}`);
			console.log(
				`The last navigation action was ${action} with state as ${location.state}`,
				JSON.stringify(this.history, null, 2)
			);
		});
	}
}

const Approutes = () => {
	const [planetCfg, setPlanetCfg] = useState({
		token: '',
		apiError: '',
		planetData: [],
		vehicleData: [],
	});
	const { apiError, token, vehicleData } = planetCfg;

	const [selecPlanetCnt, setSelecPlanetCount] = useState(0);
	const [selectedPlanet, setSelectedPlanet] = useState(() =>
		PlanetImageArr.map((planetImg) => ({
			imgname: planetImg,
			planetname: '',
			distance: '',
			isAnimated: false,
			index: -1,
		}))
	);

	const [finalData, setFinalData] = useState({
		token: '',
		planet_names: [],
		vehicle_names: [],
	});

	useEffect(() => {
		if (token.length > 0) {
			const updatedVehData = vehicleData.map((vehicleData, idx) => ({
				imgName: SpaceBotImgArr[idx],
				name: vehicleData.name.toUpperCase(),
				distance: vehicleData.max_distance,
				speed: vehicleData.speed,
				totalUnits: vehicleData.total_no,
			}));
			setPlanetCfg({ ...planetCfg, vehicleData: updatedVehData });
			setFinalData({ ...finalData, token });

			// SAVING DATA ON LOCALSTORAGE TO FETCH DATA DURING PAGE REFRESH.
			localStorage.setItem('planetCfg', JSON.stringify(updatedVehData));
			localStorage.setItem('token', token);
		}
	}, [token]);

	useEffect(() => {
		apiError.length > 0 && alert(apiError);
	}, [apiError]);

	useUpdatedPlanetAndBotsData(selecPlanetCnt, selectedPlanet, setSelectedPlanet);

	return (
		<DebugRouter>
			<Switch>
				<Suspense fallback={<div>Loading</div>}>
					<PlanetDetailsContext.Provider
						value={{
							planetCfg,
							setPlanetCfg,
							setSelectedPlanet,
							selectedPlanet,
							selecPlanetCnt,
							setSelecPlanetCount,
							finalData,
							setFinalData,
						}}
					>
						<React.Fragment>
							<section className="starGridWrapper">
								<StarGrid />
							</section>

							<Header />
							<Route path={`/`} exact={true} strict component={LandingPage} />
							<Route path={`/selectplanets`} exact={true} strict component={SelectPlanet} />
							<Route path={`/selectbots`} exact={true} strict component={SelectBots} />
							<Route
								path={`/displayallspacevehicles`}
								exact={true}
								strict
								component={DisplayAllSpaceVehicles}
							/>
							<Route path={`/displayfinalresult`} exact={true} strict component={DisplayFinalResult} />

							<Footer />
						</React.Fragment>
					</PlanetDetailsContext.Provider>
				</Suspense>
			</Switch>
		</DebugRouter>
	);
};

export default Approutes;

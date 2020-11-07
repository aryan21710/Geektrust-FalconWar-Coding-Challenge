import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PlanetDetailsContext } from '../context/appContext';
import { PlanetImageArr} from '../customHooks/useDefineConstants';
import { useUpdatedPlanetAndBotsData } from '../customHooks/useUpdatedPlanetAndBotsData';
import { StarGrid } from '../sharedComponents/StarGrid';

// *** LAZY LOAD ALL COMPONENTS FOR FASTER PAGE LOAD ***
const LandingPage = lazy(() => import('../screens/LandingPageScreen/LandingPageScreen'));
const Header = lazy(() => import('../sharedComponents/Header'));
const Footer = lazy(() => import('../sharedComponents/Footer'));
const SelectedPlanetsScreen = lazy(() => import('../screens/SelectPlanetsScreen/SelectedPlanetsScreen'));
const SelectBotsScreen = lazy(() => import('../screens/SelectBotsScreen/SelectBotsScreen'));
const DisplayAllSpaceVehicles = lazy(() => import('../screens/DisplayAllSpaceVehiclesScreen/DisplayAllSpaceVehiclesScreen'));
const DisplayFinalResultScreen = lazy(() => import('../screens/DisplayFinalResultScreen/DisplayFinalResultScreen'));

const Approutes = () => {
	const [planetCfg, setPlanetCfg] = useState({});
	const [apiError, setApiError] = useState({});
	const [selecPlanetCnt, setSelecPlanetCount] = useState(0);
	const [selectedPlanet, setSelectedPlanet] = useState(() =>
		PlanetImageArr.map((planetImg) => ({
			imgname: planetImg,
			planetname: '',
			distance: 0,
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
		if (Object.keys(planetCfg).length > 0 && Object.keys(apiError).length===0) {
			const { token, vehicleData } = planetCfg;
			if (token.length > 0) {
				setFinalData({ ...finalData, token });
				// SAVING DATA ON LOCALSTORAGE TO FETCH DATA DURING PAGE REFRESH.
				localStorage.setItem('planetCfg', JSON.stringify(vehicleData));
				localStorage.setItem('token', token);
			} 
		} else if (Object.keys(apiError).length > 0) {
			alert(`${apiError.url} ${apiError.message}`)
		}
	}, [planetCfg,apiError]);

	useUpdatedPlanetAndBotsData(selecPlanetCnt, selectedPlanet, setSelectedPlanet);

	return (
		<Router>
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
							apiError,
							setApiError
						}}
					>
						<React.Fragment>
							<section className="starGridWrapper">
								<StarGrid />
							</section>

							<Header />
							<Route path={`/`} exact={true} strict component={LandingPage} />
							<Route path={`/selectplanets`} exact={true} strict component={SelectedPlanetsScreen} />
							<Route path={`/selectbots`} exact={true} strict component={SelectBotsScreen} />
							<Route
								path={`/displayallspacevehicles`}
								exact={true}
								strict
								component={DisplayAllSpaceVehicles}
							/>
							<Route path={`/displayfinalresult`} exact={true} strict component={DisplayFinalResultScreen} />

							<Footer />
						</React.Fragment>
					</PlanetDetailsContext.Provider>
				</Suspense>
			</Switch>
		</Router>
	);
};

export default Approutes;



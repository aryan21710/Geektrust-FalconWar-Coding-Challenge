import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PlanetDetailsContext } from '../context/appContext';
import { PlanetImageArr, SpaceBotImgArr } from '../customHooks/useDefineConstants';
import { useUpdatedPlanetAndBotsData } from '../customHooks/useUpdatedPlanetAndBotsData';
import { StarGrid } from '../components/common/StarGrid';

// *** LAZY LOAD ALL COMPONENTS FOR FASTER PAGE LOAD ***
const LandingPage = lazy(() => import('../screens/LandingPage/components/LandingPage'));
const Header = lazy(() => import('../components/common/Header'));
const Footer = lazy(() => import('../components/common/Footer'));
const SelectPlanetContainer = lazy(() => import('../components/SelectPlanet/SelectPlanetContainer'));
const SelectBotContainer = lazy(() => import('../components/SelectBot/SelectBotContainer'));
const DisplayAllSpaceVehicles = lazy(() => import('../screens/DisplayAllSpaceVehicles/components/DisplayAllSpaceVehicles'));
const DisplayFinalResult = lazy(() => import('../components/DisplayFinalResult'));

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

	useEffect(()=>{
		Object.keys(apiError).length > 0 && alert(`${apiError.url} ${apiError.message}`)
	},[apiError])

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
							<Route path={`/selectplanets`} exact={true} strict component={SelectPlanetContainer} />
							<Route path={`/selectbots`} exact={true} strict component={SelectBotContainer} />
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
		</Router>
	);
};

export default Approutes;



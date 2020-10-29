import React, { useContext, useState, useEffect } from 'react';
import { SelectedPlanetWrapper, Heading } from './common/StyledComponent';
import { PlanetDetailsContext } from '../context/appContext';
import { usePostDataToFetchResult } from '../customHooks/usePostDataToFetchResult';

const DisplayFinalResult = () => {
	const { finalData } = useContext(PlanetDetailsContext);
	const [backendResponse, setBackendResponse] = useState({});
    const [status, setStatus] = useState(false);
    const [error, setError] = useState({});
    const [displayMessage, setDisplayMessage] = useState("");

	usePostDataToFetchResult(finalData,setBackendResponse, backendResponse,setError,error);

	useEffect(() => {
		if (Object.keys(backendResponse).length > 0) {
            const { status, planet_name } = backendResponse;
            status ? setDisplayMessage(`CONGRATULATIONS . YOU FOUND AL FALCONE ON ${planet_name.toUpperCase()}.`) :  setDisplayMessage('MISSION FAILED.. KEEP LOOKING FOR AL FALCONE')
			setStatus(status);
		} else if (Object.keys(error).length > 0) {
            error.response.status===400 && setDisplayMessage(`START THE MISSION ALL OVER AGAIN...`)
        }
        return ()=>{
            localStorage.clear()
        }
    }, [backendResponse,error]);
    
	return (
		<React.Fragment>
			<SelectedPlanetWrapper>
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					{displayMessage.length > 0 && displayMessage}
				</Heading>
			</SelectedPlanetWrapper>
		</React.Fragment>
	);
};

export default DisplayFinalResult;

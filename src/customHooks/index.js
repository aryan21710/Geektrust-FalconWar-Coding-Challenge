import { useFetchDataFromBackend } from './useFetchDataFromBackend';
import { usePostDataToFetchResult } from './usePostDataToFetchResult';
import { useUpdatedPlanetAndBotsData } from './useUpdatedPlanetAndBotsData';
import {useSelectedPlanetDataTOHandleAnim} from './useSelectedPlanetDataTOHandleAnim'

export const myCustomHooks = {
	useFetchDataFromBackend,
	usePostDataToFetchResult,
    useUpdatedPlanetAndBotsData,
    useSelectedPlanetDataTOHandleAnim
}
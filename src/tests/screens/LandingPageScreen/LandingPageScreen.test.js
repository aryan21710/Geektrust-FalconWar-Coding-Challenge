import React from 'react';
import LandingPageScreen from '../../../screens/LandingPageScreen/LandingPageScreen';
import { shallow, mount, render } from '../../../../enzyme';
import toJSON from 'enzyme-to-json';
import { PlanetDetailsContext } from '../../../context/appContext';
import { ImageBadges } from '../../../lib/constants';
import { useHistory } from 'react-router';



describe('TESTING LandingPageScreen COMPONENT', () => {
	test('SNAPSHOT', () => {
		const TestComponent = () => {
			return (
				<PlanetDetailsContext.Provider value={PlanetDetailsContext}>
					<LandingPageScreen />
				</PlanetDetailsContext.Provider>
			);
		};

		const wrapper = shallow(<TestComponent />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});

	test('renders component and its contents properly', () => {
		const TestComponent = () => {
			return (
				<PlanetDetailsContext.Provider
					value={{ planetCfg: {}, setPlanetCfg: {}, apiError: {}, setApiError: {} }}
				>
					<LandingPageScreen />
				</PlanetDetailsContext.Provider>
			);
		};

		const wrapper = mount(<TestComponent />);
		const wrapperB = wrapper.find('img#images');
		console.log('image:-', wrapper.debug());
		expect(wrapper.find('img#images')).toHaveLength(Object.keys(ImageBadges).length);
        expect(wrapper.find(LandingPageScreen).exists()).toBeTruthy();
        expect(wrapper.find('h1#heading').exists()).toBeTruthy();
        expect(wrapper.find('h1#heading').text()).toMatch(/Queen Al Falcone/);
        expect(wrapper.find('p').text()).toMatch(/Lets Find Falcone/);
    });
    

    test('simulate next page event', () => {

		const TestComponent = () => {
			return (
				<PlanetDetailsContext.Provider
					value={{ planetCfg: {}, setPlanetCfg: {}, apiError: {}, setApiError: {} }}
				>
					<LandingPageScreen />
				</PlanetDetailsContext.Provider>
			);
		};
        
        const wrapper = mount(<TestComponent />);
        expect(wrapper.find('#redirectToNextPageBtn').exists()).toBeTruthy();
        // wrapper.find('#redirectToNextPageBtn').simulate('click');


	});
});

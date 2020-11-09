import React from 'react';
import Header from '../../sharedComponents/Header';
import { shallow, mount, render } from '../../../enzyme';
import toJSON from  'enzyme-to-json';

describe('TESTING HEADER COMPONENT', () => {
	test('SNAPSHOT', () => {
		const wrapper = shallow(<Header />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});

	test('renders text properly', () => {
        const wrapper = mount(<Header/>)
        expect(wrapper.find('h1').length).toBe(1);
        expect(wrapper.find('h1').text()).toBe('WELCOME TO THE BATTLE OF TARA B');

	});
});

import React from 'react';
import { CustomButton } from '../../sharedComponents/CustomButton';
import { shallow, mount, render } from '../../../enzyme';
import toJSON from 'enzyme-to-json';

const mockHistoryPush = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('TESTING CustomButton COMPONENT', () => {
	test('Snapshot', () => {
		const [redirectPath, leftpos, TextForButton, width, disabled, opacity] = [
			'someText',
			'someText',
			'someText',
			'someText',
			true,
			1,
        ];
        
		const wrapper = shallow(
			<CustomButton
				redirectPath={redirectPath}
				leftpos={leftpos}
				TextForButton={TextForButton}
				width={width}
				disabled={disabled}
				opacity={opacity}
			/>
		);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});

	test('renders buttontext properly', () => {
        const redirectPath='/selectplanets'
		const wrapper = mount(<CustomButton />);
        expect(wrapper.find('img').length).toBe(1);
        expect(wrapper.find('#redirectToNextPageBtn').exists()).toBeTruthy();
        wrapper.find('div#redirectToNextPageBtn').simulate('click');
        expect(mockHistoryPush).toHaveBeenCalledTimes(1)

	});
});

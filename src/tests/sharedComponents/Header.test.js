import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../sharedComponents/Header';

describe('TESTING HEADER COMPONENT', () => {
	test('renders without crashing', () => {
		render(<Header />);
	});

	test('renders text properly', () => {
        render(<Header />);
        screen.getByText('WELCOME TO THE BATTLE OF TARA B');
        screen.getByTestId('Headerh1');
	});
});

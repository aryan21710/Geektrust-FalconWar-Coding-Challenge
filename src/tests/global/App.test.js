import React from "react";
import { render } from '@testing-library/react';
import Approutes from '../../routers/Approutes';

test('renders without crashing', () => {
    render(<Approutes />);
});

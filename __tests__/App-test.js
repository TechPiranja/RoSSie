import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

global.fetch = jest.fn(() => new Promise((resolve) => resolve()));
jest.mock('react-native-gesture-handler', () => {});
jest.mock('@react-navigation/stack', () => {});

it('renders correctly', () => {
  renderer.create(<App />);
});

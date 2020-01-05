import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

it.skip('renders correctly', () => {
    const tree =renderer.create(
        <App context={{ insertCss: () => {} }}>
            <div></div>
        </App>,
      ).toJSON();
    expect(tree).toMatchSnapshot();
});

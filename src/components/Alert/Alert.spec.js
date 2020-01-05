import React from 'react';
import Alert from './Alert';
import renderer from 'react-test-renderer';
import { mount, shallow, render } from 'enzyme';

it('renders correctly', () => {
    const tree = shallow(<Alert>PebbleFields</Alert>);

    // const tree = renderer.create(<Alert>PebbleFields</Alert>).toJSON();
    expect(tree).toMatchSnapshot();
});

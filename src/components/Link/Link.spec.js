import React from 'react';
import Link from './Link';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<Link to="http://www.pebblefields.com">PebbleFields</Link>).toJSON();
    expect(tree).toMatchSnapshot();
});

it('allows child elments', () => {
    const tree = renderer.create(<Link to="http://www.pebblefields.com"><b><i>PebbleFields</i></b></Link>).toJSON();
    expect(tree).toMatchSnapshot();
});

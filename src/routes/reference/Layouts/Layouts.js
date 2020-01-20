import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Layouts.css';
import Base from '../../../components/Base';
import BreadCrumbs from '../../../components/BreadCrumbs';
import Button from '../../../components/Button';
import Hr from '../../../components/Hr';
import NavList from '../../../components/NavList';
import SkipLinks from '../../../components/SkipLinks';
import loremIpsum from 'lorem-ipsum';

export class Layouts extends Base {
	static contextTypes = {
	    currentPath: PropTypes.string,
	};

	constructor(props) {
	    super(props);

	    this.state = {};
	}

	componentDidMount() {
	    // window.addEventListener('scroll', this.handleScroll);
	    this.contentsDiv.addEventListener('scroll', this.handleScroll);
	}

	componentDidUnMount() {
	    // window.removeEventListener('scroll', this.handleScroll);
	    this.contentsDiv.removeEventListener('scroll', this.handleScroll);
	}

    handleScroll = (e) => {
        if (e.srcElement.scrollTop > 48) {
            this.headerDiv.style.height = '0px';
        } else {
            this.headerDiv.style.height = '48px';
        }
    }

	getDummyRoutes = () => {
	    const list = [];
	    for (let i = 0; i < 50; i++) {
	        list.push({
	            text: `Dummy Link ${i}`,
	        });
	    }
	    return list;
	}

	render() {
	    const getLoremIpsum = function () {
	        return loremIpsum({
	            count: 3,
	            units: 'paragraphs',
	            paragraphUpperBound: 6,
	        });
	    };
	    return (

    <div data-e2e={this.e2e()} className={s.root}>
                The layout helps users navigate the app easier. This often means a stick navigator(s), scrollable contents, and flex width.


    <div className={s.layout}>
    <div ref={(el) => { this.headerDiv = el; }} className={s.header}>
            <h2>Header</h2>
        </div>
    <nav className={cx(s.nav, s.container)}>

    <Button>Menu1</Button>
    <Button>Menu2</Button>

	                </nav>
    <div className={s.body}>
    <div className={cx(s.sideNav, s.container)}>
    <NavList
    array={this.getDummyRoutes()}
	                        />
	                    </div>
	                    <div ref={(el) => { this.contentsDiv = el; }} className={cx(s.contents, s.container)}>
            <p>{getLoremIpsum()}</p>
            <p>{getLoremIpsum()}</p>
            <p>{getLoremIpsum()}</p>
        </div>
	                </div>
	            </div>

    <Hr />

	        </div>
	    );
	}
}

export default withStyles(s)(Layouts);

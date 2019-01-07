import React from 'react';
import Base from '../Base';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchInput.css';
import cx from 'classnames';
import NavList from '../NavList';
import InputText from '../InputText';
import { models, actions as homeActions } from '../../libs/home';

const AppState = models.AppState;

class SearchInput extends Base {
    
    constructor(props) {
        super(props);

        this.overlayKey = null;
        
        this.state = {
            searchContentTimestamp: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.getDropdown = this.getDropdown.bind(this);
    }

    componentWillMount() {
        homeActions.appState.getOverlayId().then(id => {
            this.overlayKey = id;
        });
    }

    handleChange(name, value) {
        let state = this.state;
        
        homeActions.appState.setOverlayId(this.overlayKey, true);

        value = value.toLowerCase();

        state.dropDownList = this.uiData.routes.filter((routeObj) => {
            let str = routeObj.text.toLowerCase(); //could add route, etc
            return str.indexOf(value) !== -1;
        });
        this.setState(state);
    }

    getDropdown() {
        if (this.overlayKey && this.props.appState.overlays[this.overlayKey]) {
            return ( 
                <div className={cx(s.dropdownContent, s.container)}>
                    <NavList
                        array={this.state.dropDownList}
                    />
                </div>
                );
        } else {
            return (<div />);
        }
    }
    
    render() { 
        return (
        <div data-e2e={this.e2e()} >
            <InputText 
                name="searchInput"
                placeholder="Search ..."
                onChange={this.handleChange}
                onBlur={()=>{}}
            />
            {this.getDropdown()}
        </div>
        );
    }
}

SearchInput.propTypes = {
    appState: PropTypes.instanceOf(AppState),
};

export default withStyles(s)(SearchInput);

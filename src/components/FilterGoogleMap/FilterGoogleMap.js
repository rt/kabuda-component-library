import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './FilterGoogleMap.css';
import cx from 'classnames';
import Base from '../Base';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

/**
 * AIzaSyAuYSkK3MVTXmNHR6Oc9ezijblKSQWrGdw
 */
export class FilterGoogleMap extends Base {
    constructor(props) {
        super(props);

        this.state = {
            selectedPlace: {},
        };

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    }

    onMarkerClick() {
    }

    onInfoWindowClose() {
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <Map google={this.props.google} zoom={14}>

                    <Marker
                        onClick={this.onMarkerClick}
                        name="Current location"
                    />

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

FilterGoogleMap.propTypes = {
};

export default withStyles(s)(GoogleApiWrapper({
    apiKey: 'AIzaSyAuYSkK3MVTXmNHR6Oc9ezijblKSQWrGdw',
})(FilterGoogleMap));

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './FilterCalendar.css';
import cx from 'classnames';
import Base from '../Base';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k]);


/**
 */
export class FilterCalendar extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <BigCalendar
                    {...this.props}
                    events={[]}
                    views={allViews}
                    defaultDate={new Date(2017, 3, 1)}
                />
            </div>
        );
    }
}

FilterCalendar.propTypes = {
};

export default withStyles(s)(FilterCalendar);

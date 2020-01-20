import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Formatting.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import Hr from '../../../components/Hr';
import InputText from '../../../components/InputText';
import Label from '../../../components/Label';
import numberFormatter from '../../../utils/numberFormatter';
import dateFormatter from '../../../utils/dateFormatter';

export class Formatting extends Base {
    constructor(props) {
        super(props);

        this.state = {
            hours: new Date().getHours(),
            pos: 1000000,
            neg: -5000,
            zero: 0,
        };

        this.changeHours = this.changeHours.bind(this);
        this.handlePosChange = this.handlePosChange.bind(this);
        this.handleNegChange = this.handleNegChange.bind(this);
        this.handleZeroChange = this.handleZeroChange.bind(this);
    }


    changeHours(name, val) {
        const state = this.state;
        state.hours = val;
        this.setState(state);
    }
    handlePosChange(name, val) {
        const state = this.state;
        state.pos = val;
        this.setState(state);
    }
    handleNegChange(name, val) {
        const state = this.state;
        state.neg = val;
        this.setState(state);
    }
    handleZeroChange(name, val) {
        const state = this.state;
        state.zero = val;
        this.setState(state);
    }

    render() {
        const pad = n => (n < 10 ? `0${n}` : n);

        const getDate = () => {
            // use constructor wo/iso so that you get browser local time
            const now = new Date();
            const localDate = new Date(now.getFullYear(), now.getMonth(), now.getDay(), this.state.hours);
            return localDate;
        };

        const getLocalTime = (locale, tz) => {
            const localDate = getDate();

            // display options are kept even when locale changed
            // options: numeric, short, 2-digit,...
            //
            const localDateString = localDate.toLocaleDateString(locale, {
                timeZone: tz,
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
            });
            return localDateString;
        };

        const getReadableTimezone = (tz) => {
            const sign = tz > 0 ? '-' : '+';

            const hours = pad(Math.floor(Math.abs(tz) / 60));
            const minutes = pad(Math.abs(tz) % 60);

            return `${sign + hours}:${minutes}`;
        };

        const getTimezone = () => {
            const tz = new Date().getTimezoneOffset();
            return `Current Timezone: ${tz} means > ${getReadableTimezone(tz)}`;
        };

        return (
            <div data-e2e={this.e2e()}>
                <Section title="Date">
                    <SubSection>
                        <div key="main">
                            <div className={s.row}>
                                <div className={s.column}>
                                    <p>
                                        <b>Basic Rules</b><br />
                                        -User input takes local time (time zone) <br />
                                        -Store in UTC, instantiate date object from them<br />
                                        -Display with the local date string<br />
                                    </p>
                                    <p>
                                        <b>Current Browser</b><br />
                                        en-US: {getLocalTime('en-US')}<br />
                                        ja-JP: {getLocalTime('ja-JP')}<br />
                                    </p>

                                    <p>
                                        <b>Simulate Elsewhere Browser</b><br />
                                        en-US, America/New_York: {getLocalTime('en-US', 'America/New_York')}<br />
                                        ja-JP, Asia/Tokyo: {getLocalTime('ja-JP', 'Asia/Tokyo')}<br />
                                    </p>
                                </div>
                                <div className={s.column}>
                                    <div className={s.row}>
                                        <div className={s.column}>
                                            <Label>Time (hours: 0 - 24)</Label>
                                        </div>
                                        <div className={s.column}>
                                            <InputText
                                                name="hours"
                                                onChange={this.changeHours}
                                                value={this.state.hours}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <b>UTC</b>: {new Date().toISOString()}
                                    </div>
                                    <div>
                                        <b>Local</b>: {getLocalTime()}
                                    </div>
                                    <div>
                                        <b>Formatted Date</b>: {dateFormatter.formatDate(getDate())}
                                    </div>
                                    <div>
                                        <b>Formatted Time</b>: {dateFormatter.formatTime(getDate())}
                                    </div>

                                    <Hr />
                                    ISO is the standard <i>format</i> time<br />
                                    GMT is a <i>time zone</i> <br />
                                    UTC is the <i>time standard</i> that worlds regulate time<br />

                                    <Hr />
                                    <b>getTimezoneOffset()</b> <br />
                                    <i>The number of minutes added to local time that gives UTC time</i>
                                    <p>{getTimezone()}</p>

                                </div>
                            </div>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
                <Section title="Currency">
                    <SubSection>
                        <div key="main">
                            <div className={s.row}>
                                <div className={cx(s.column)}>
                                    <InputText
                                        name="pos"
                                        value={this.state.pos}
                                        onChange={this.handlePosChange}
                                        autoFocus
                                    />
                                </div>
                                <div className={cx(s.column)}>{numberFormatter.formatCurrency(this.state.pos)}</div>
                            </div>
                            <div className={s.row}>
                                <div className={cx(s.column)}>
                                    <InputText
                                        name="neg"
                                        value={this.state.neg}
                                        onChange={this.handleNegChange}
                                        autoFocus
                                    />
                                </div>
                                <div className={cx(s.column)}>{numberFormatter.formatCurrency(this.state.neg)}</div>
                            </div>
                            <div className={s.row}>
                                <div className={cx(s.column)}>
                                    <InputText
                                        name="zero"
                                        value={this.state.zero}
                                        onChange={this.handleZeroChange}
                                        autoFocus
                                    />
                                </div>
                                <div className={cx(s.column)}>{numberFormatter.formatCurrency(this.state.zero)}</div>
                            </div>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>
        );
    }
}

export default withStyles(s)(Formatting);

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Countdown.css';
import Base from '../Base';
import InputRange from '../InputRange';

export class Countdown extends Base {
    constructor(props) {
        super(props);

        this.state = {
            comingSoonText: '',
        };
    }

    componentDidMount() {
        this.runComingSoon();
    }

    componentWillUnmount() {
        clearInterval(this.x);
    }

    runComingSoon() {
        // Set the date we're counting down to
        const countDownDate = new Date(this.props.dateStr).getTime();

        // Update the count down every 1 second
        this.x = setInterval(() => {
            if (this) {
                const now = new Date().getTime();

                // Find the distance between now an the count down date
                const distance = countDownDate - now;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                const text = `${days}d ${hours}h ${minutes}m ${seconds}s `;
                this.setState({ comingSoonText: text });

                // If the count down is finished, write some text
                if (distance < 0) {
                    clearInterval(this.x);
                    return this.props.arrivedText;
                }
            }
        }, 1000);
    }

    render() {
        return (
            <span data-e2e={this.e2e()} className={s.root}> {this.state.comingSoonText} </span>
        );
    }
}

Countdown.propTypes = {
    dateStr: PropTypes.string.isRequired,
    arrivedText: PropTypes.string.isRequired,
    // durationArrived: PropTypes.number.isRequired,
    // pastText: PropTypes.string.isRequired,
};

export default withStyles(s)(Countdown);

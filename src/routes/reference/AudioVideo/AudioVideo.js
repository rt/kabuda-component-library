import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AudioVideo.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import Audio from '../../../components/Audio';
import Video from '../../../components/Video';
import ButtonGroup from '../../../components/ButtonGroup';

export class AudioVideo extends Base {
    constructor(props) {
        super(props);
    }

    // need to build custom control
    playPause = () => {
        // if (this.paused) {
        // this.ref.play();
        // } else {
        // this.ref.pause();
        // }
    }

    seek = (by) => {
        // this.ref
    }

    getButtons = () => [
        {
            text: 'play/pause',
            onClick: this.playPause,
        },
        {
            text: 'back 10s',
            onClick: () => { this.seek(-10); },
        },
        {
            text: 'forward 10s',
            onClick: () => { this.seek(-10); },
        },
        {
            text: 'restart',
        },
    ]

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <Section title="Video">
                    <SubSection>
                        <div key="main">
                            <Video
                                responsive="width"
                                src="/bball.mp4"
                                autoPlay={false}
                            />
                            <div>
                                <ButtonGroup
                                    buttons={this.getButtons()}
                                />
                            </div>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
                <Section title="Audio">
                    <SubSection>
                        <div key="main">
                            <Audio
                                responsive="width"
                                src="/sampleAudio.mp3"
                                autoPlay={false}

                            />
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>
        );
    }
}

export default withStyles(s)(AudioVideo);

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './LogoAndIcons.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import FaHome from 'react-icons/lib/fa/home';
import FaSearch from 'react-icons/lib/fa/search';
import FaCloud from 'react-icons/lib/fa/cloud';

import MdAndroid from 'react-icons/lib/md/android';

import TiCamera from 'react-icons/lib/ti/camera';

import GoLightbulb from 'react-icons/lib/go/light-bulb';

import FaGoogle from 'react-icons/lib/fa/google';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaLinkedin from 'react-icons/lib/fa/linkedin';
import FaYoutube from 'react-icons/lib/fa/youtube';
import FaPinterest from 'react-icons/lib/fa/pinterest';
import FaReddit from 'react-icons/lib/fa/reddit';
import FaSkype from 'react-icons/lib/fa/skype';
import FaAndroid from 'react-icons/lib/fa/android';
import FaDribbble from 'react-icons/lib/fa/dribbble';
import FaVimeo from 'react-icons/lib/fa/vimeo';
import FaTumblr from 'react-icons/lib/fa/tumblr';
import FaRsssquare from 'react-icons/lib/fa/rss-square';
import FaVine from 'react-icons/lib/fa/vine';
import FaFoursquare from 'react-icons/lib/fa/foursquare';
import FaStumbleupon from 'react-icons/lib/fa/stumbleupon';
import FaFlickr from 'react-icons/lib/fa/flickr';
import FaYahoo from 'react-icons/lib/fa/yahoo';
import FaSoundcloud from 'react-icons/lib/fa/soundcloud';
import AccessibilityNote from '../AccessibilityNote';

export class LogoAndIcons extends Base {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <Section title="SVG Icons">
                    <SubSection>
                        <div key="main">
                            <h3><a href="https://gorangajic.github.io/react-icons/fa.html" target="_blank">Font Awesome</a></h3>

                            <div className={cx(s.iconDisplay, s.panel)}>
                                <span className={cx(s.textTiny, s.container)}><FaHome role="img" /></span>
                                <span className={cx(s.textSmall, s.container)}><FaHome role="img" /></span>
                                <span className={cx(s.textMedium, s.container)}><FaHome role="img" /></span>
                                <span className={cx(s.textLarge, s.container)}><FaHome role="img" /></span>
                                <span className={cx(s.textXlarge, s.container)}><FaHome role="img" /></span>
                            </div>
                            <div className={cx(s.iconDisplay, s.panel)}>
                                <span className={cx(s.textTiny, s.container)}><FaSearch role="img" /></span>
                                <span className={cx(s.textSmall, s.container)}><FaSearch role="img" /></span>
                                <span className={cx(s.textMedium, s.container)}><FaSearch role="img" /></span>
                                <span className={cx(s.textLarge, s.container)}><FaSearch role="img" /></span>
                                <span className={cx(s.textXlarge, s.container)}><FaSearch role="img" /></span>
                            </div>
                            <div className={cx(s.iconDisplay, s.panel)}>
                                <span className={cx(s.textTiny, s.container)}><FaCloud role="img" /></span>
                                <span className={cx(s.textSmall, s.container)}><FaCloud role="img" /></span>
                                <span className={cx(s.textMedium, s.container)}><FaCloud role="img" /></span>
                                <span className={cx(s.textLarge, s.container)}><FaCloud role="img" /></span>
                                <span className={cx(s.textXlarge, s.container)}><FaCloud role="img" /></span>
                            </div>

                            <h3><a href="https://gorangajic.github.io/react-icons/md.html" target="_blank">Google Material Icons</a></h3>

                            <div className={cx(s.iconDisplay, s.panel)}>
                                <span className={cx(s.textTiny, s.container)}><MdAndroid role="img" /></span>
                                <span className={cx(s.textSmall, s.container)}><MdAndroid role="img" /></span>
                                <span className={cx(s.textMedium, s.container)}><MdAndroid role="img" /></span>
                                <span className={cx(s.textLarge, s.container)}><MdAndroid role="img" /></span>
                                <span className={cx(s.textXlarge, s.container)}><MdAndroid role="img" /></span>
                            </div>

                            <h3><a href="https://gorangajic.github.io/react-icons/ti.html" target="_blank">Typicons</a></h3>

                            <div className={cx(s.iconDisplay, s.panel)}>
                                <span className={cx(s.textTiny, s.container)}><TiCamera role="img" /></span>
                                <span className={cx(s.textSmall, s.container)}><TiCamera role="img" /></span>
                                <span className={cx(s.textMedium, s.container)}><TiCamera role="img" /></span>
                                <span className={cx(s.textLarge, s.container)}><TiCamera role="img" /></span>
                                <span className={cx(s.textXlarge, s.container)}><TiCamera role="img" /></span>
                            </div>

                            <h3><a href="https://gorangajic.github.io/react-icons/go.html" target="_blank">Github Octicons</a></h3>

                            <div className={cx(s.iconDisplay, s.panel)}>
                                <span className={cx(s.textTiny, s.container)}><GoLightbulb role="img" /></span>
                                <span className={cx(s.textSmall, s.container)}><GoLightbulb role="img" /></span>
                                <span className={cx(s.textMedium, s.container)}><GoLightbulb role="img" /></span>
                                <span className={cx(s.textLarge, s.container)}><GoLightbulb role="img" /></span>
                                <span className={cx(s.textXlarge, s.container)}><GoLightbulb role="img" /></span>
                            </div>
                        </div>
                        <div key="notes">
                            <AccessibilityNote>
                            Icons need additional markup to provide information to screen readers.  If the icon is only used for decorative purposes or provides no additional information add <code>aria-hidden="true"</code>
                            </AccessibilityNote>
                        </div>
                    </SubSection>
                </Section>
                <Section title="Ex. Social Media Icons">
                    <SubSection>
                        <div key="main">
                            <div className={s.socialDisplay}>
                                <a href="#" className={cx(s.social, s.facebook)}>
                                    <FaFacebook />
                                </a>
                                <a href="#" className={cx(s.social, s.twitter)}>
                                    <FaTwitter />
                                </a>
                                <a href="#" className={cx(s.social, s.google)}>
                                    <FaGoogle />
                                </a>
                                <a href="#" className={cx(s.social, s.linkedin)}>
                                    <FaLinkedin />
                                </a>
                                <a href="#" className={cx(s.social, s.youtube)}>
                                    <FaYoutube />
                                </a>
                                <a href="#" className={cx(s.social, s.pinterest)}>
                                    <FaPinterest />
                                </a>
                                <a href="#" className={cx(s.social, s.reddit)}>
                                    <FaReddit />
                                </a>
                                <a href="#" className={cx(s.social, s.skype)}>
                                    <FaSkype />
                                </a>
                                <a href="#" className={cx(s.social, s.android)}>
                                    <FaAndroid />
                                </a>
                                <a href="#" className={cx(s.social, s.dribbble)}>
                                    <FaDribbble />
                                </a>
                                <a href="#" className={cx(s.social, s.vimeo)}>
                                    <FaVimeo />
                                </a>
                                <a href="#" className={cx(s.social, s.tumblr)}>
                                    <FaTumblr />
                                </a>
                                <a href="#" className={cx(s.social, s.rss)}>
                                    <FaRsssquare />
                                </a>
                                <a href="#" className={cx(s.social, s.vine)}>
                                    <FaVine />
                                </a>
                                <a href="#" className={cx(s.social, s.foursquare)}>
                                    <FaFoursquare />
                                </a>
                                <a href="#" className={cx(s.social, s.stumbleupon)}>
                                    <FaStumbleupon />
                                </a>
                                <a href="#" className={cx(s.social, s.flickr)}>
                                    <FaFlickr />
                                </a>
                                <a href="#" className={cx(s.social, s.yahoo)}>
                                    <FaYahoo />
                                </a>
                                <a href="#" className={cx(s.social, s.soundcloud)}>
                                    <FaSoundcloud />
                                </a>
                            </div>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>
        );
    }
}

export default withStyles(s)(LogoAndIcons);

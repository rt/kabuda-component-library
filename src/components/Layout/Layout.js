import React from 'react';
import Base from '../Base';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Bar from '../Bar';
import Header from '../Header';
import Footer from '../Footer';
import SurfaceBar from '../SurfaceBar';
import SurfaceHeader from '../SurfaceHeader';
import SurfaceMain from '../SurfaceMain';
import AppState from '../../libs/home/models/app-state';

class Layout extends Base {
    static propTypes = {
        children: PropTypes.node.isRequired,
        hideHeader: PropTypes.bool,
        appState: PropTypes.instanceOf(AppState),
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <div className={s.bar}>
                    <SurfaceBar><Bar /></SurfaceBar>
                </div>
                {!this.props.hideHeader && (
                    <div className={s.header}>
                        <SurfaceHeader>
                            <Header />
                        </SurfaceHeader>
                    </div>
                )}
                <div className={s.main}>
                    <SurfaceMain>
                        {React.cloneElement(this.props.children, { appState: this.props.appState })}
                    </SurfaceMain>
                </div>
                <div className={s.footer}>
                    <SurfaceBar>
                        <Footer />
                    </SurfaceBar>
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Layout);

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ArticleContainer.css';
import cx from 'classnames';
import Base from '../Base';

/**
 * - make image optional
*/
class ArticleContainer extends Base {
    constructor(props) {
        super(props);
    }

    buttonDidMount = (button) => {
        this.scrollToTopButton = button;
    }

    paneDidMount = (node) => {
        this.articleNode = node;
        if (node) {
            node.addEventListener('scroll', () => {
                if (node.scrollTop > 20 || node.scrollTop > 20) {
                    this.scrollToTopButton.style.display = 'block';
                } else {
                    this.scrollToTopButton.style.display = 'none';
                }
            });
        }
    }

    handleScrollTopClick = (e) => {
        // When the user clicks on the button, scroll to the top of the document
        this.articleNode.scrollTop = 0; // For Chrome, Safari and Opera
        // document.body.scrollTop = 0; // For Chrome, Safari and Opera
        // document.documentElement.scrollTop = 0; // For IE and Firefox
    }

    render() {
        return (
            <article ref={this.paneDidMount} className={cx(s.root, s.scroll)}>
                {React.cloneElement(this.props.children)}
                <button
                    ref={this.buttonDidMount}
                    onClick={this.handleScrollTopClick}
                    className={s.scrollToTopButton}
                    id="myBtn"
                    title="Go to top"
                >Top
                </button>
            </article>
        );
    }
}

ArticleContainer.propTypes = {
};

export default withStyles(s)(ArticleContainer);

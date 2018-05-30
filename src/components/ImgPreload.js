import React from 'react';
import PropTypes from 'prop-types';

import imageChecker from '../util/imageChecker';
import makeCancelable from '../util/makePromiseCancelable';

class ImgPreload extends React.Component {
  _promise = null;
  state = {
    validatedSrc: null,
    loading: false
  }

  componentDidMount() {
    this.handleCheck();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.src !== this.props.src && this.props.src) {
      this.handleCheck();
    }
  }

  componentWillUnmount() {
    this._promise && this._promise.cancel();
  }

  handleCheck = () => {
    this.setState({loading: true});
    this._promise = this.checkHandler(this.props.src);

    this._promise.promise
      .then(validated => this.setState({
        validatedSrc: validated.url,
        loading: false
      }))
      .catch((reason) => {
        console.log('isCanceled', reason.isCanceled);
        if (!reason.isCanceled) {
          this.setState({
            validatedSrc: this.placeholderSrc,
            loading: false
          })
        }
      });
  }

  checkHandler = (src) => {
    return makeCancelable(imageChecker(src));
  }

  render() {
    const { validatedSrc, loading } = this.state;
    const isPlaceholder = loading || !validatedSrc;
    const currSrc = isPlaceholder ? this.props.placeholderSrc : validatedSrc
    return this.props.render(currSrc, isPlaceholder);
  }
}

ImgPreload.propTypes = {
  render: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  placeholderSrc: PropTypes.string
}
ImgPreload.defaultProps = {
  placeholderSrc: 'http://dummyimage.com/928x680.png/cc0000/ffffff'
}

export default ImgPreload;
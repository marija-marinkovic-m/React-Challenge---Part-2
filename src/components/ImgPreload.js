import React from 'react';
import PropTypes from 'prop-types';

import imageChecker from '../util/image-checker';
import makeCancelable from '../util/cancelable-promise';

import CircularProgress from '@material-ui/core/CircularProgress';

const fallbackSrc = '/static/assets/images/logo-landing.png';

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
            validatedSrc: fallbackSrc,
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
    return validatedSrc ? this.props.render(validatedSrc) : (loading ? <CircularProgress /> : null);
  }
}

ImgPreload.propTypes = {
  render: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired
}

export default ImgPreload;
import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Row } from 'reactstrap'

export default class ErrorBox extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
    isWarning: PropTypes.bool,
  };

  static defaultProps = {
    isWarning: false,
  };

  render() {
    return (
      <Row>
        <Alert className={"col-12"} color={this.props.isWarning ? "warning" : "danger"} isOpen={this.props.message !== ''} toggle={this.props.onToggle}>{this.props.message}</Alert>
      </Row>
    )
  }
}

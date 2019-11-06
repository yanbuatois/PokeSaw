import React from 'react';
import PropTypes from 'prop-types';
import RGBYSave from '../../Core/RBGYSave'
import { Form, Row, FormGroup, Label } from 'reactstrap'

export default class RGBYEditor extends React.Component {
  static propTypes = {
    save: PropTypes.instanceOf(RGBYSave).isRequired,
    displayError: PropTypes.func,
  };

  static defaultProps = {
    displayError: () => {},
  };

  constructor (...args) {
    super(...args);
    this.formRefs = {
      playerName: React.createRef(),
    };
  }

  formSubmitted = (event) => {
    event.preventDefault();
    const [success, message] = this.props.save.writePlayerName(this.formRefs.playerName.current.value);
    if (!success) {
      this.props.displayError(message);
    }
    this.props.save.regenChecksum();
    this.props.save.saveAs();
  }

  render() {
    return (
      <Row>
        <Form onSubmit={this.formSubmitted} className={"col-12"}>
          <FormGroup row>
            <Label for={"playerName"}>
              Player name
            </Label>
            <input type="text" id={"playerName"} maxLength={10} placeholder={"Player name"} className={"form-control"} defaultValue={this.props.save.playerName} ref={this.formRefs.playerName} />
          </FormGroup>
          <FormGroup row>
            <button className={"btn btn-success"} type={"submit"}>Edit save</button>
            <button className={"btn btn-danger"} type={"reset"}>Reset</button>
          </FormGroup>
        </Form>
      </Row>
    );
  }
}

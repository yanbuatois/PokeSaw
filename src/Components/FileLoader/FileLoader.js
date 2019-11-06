import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Row } from 'reactstrap'

export default class FileLoader extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit: () => {},
  };

  constructor (...args) {
    super(...args);

    // this.state = {
    //   file: '',
    // };
    this.fileInput = React.createRef();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.fileInput.current.files[0]);
  }

  render() {
    return (
      <Row>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>
              Save file : <input className={'form-control-file'} type={"file"} ref={this.fileInput} />
            </Label>
            <Button color="success">Load</Button>
          </FormGroup>
        </Form>
      </Row>
    )
  }
}

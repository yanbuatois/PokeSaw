import React from 'react';
import { Container } from 'reactstrap'

import RGBYSave from './Core/RBGYSave'

import FileLoader from './Components/FileLoader/FileLoader';
import ErrorBox from './Components/ErrorBox/ErrorBox';
import RGBYEditor from './Components/RGBYEditor/RGBYEditor';

class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      errorMessage: '',
      isErrorWarning: false,
      displayFileLoader: true,
      save: null,
    };
  }

  displayErrorMessage = (message = '', warning = false) => {
    this.setState({
      errorMessage: message,
      isErrorWarning: warning,
    });
  }

  handleJsError(error) {
    console.error(error);
    this.displayErrorMessage(error.message);
  }

  onFileLoaded = async (file) => {
    if (typeof file === 'undefined') {
      // console.log('fail :(');
      this.displayErrorMessage("You must select a file.");
    } else {
      try {
        console.log(file);
        const save = new RGBYSave(file);
        await save.bufferingSave();
        console.log(save.computedChecksum);
        this.setState({
          displayFileLoader: false,
          save,
        });
      } catch (err) {
        this.handleJsError(err);
      }
    }
  }

  onErrorBoxToggle = () => {
    this.setState({
      errorMessage: '',
    });
  }

  render () {
    return (
      <Container>
        {this.state.displayFileLoader && <FileLoader onSubmit={this.onFileLoaded} />}
        {this.state.save && <RGBYEditor displayError={this.displayErrorMessage} save={this.state.save} />}
        <ErrorBox onToggle={this.onErrorBoxToggle} isWarning={this.state.isErrorWarning} message={this.state.errorMessage} />
      </Container>
    );
  }
}

export default App;

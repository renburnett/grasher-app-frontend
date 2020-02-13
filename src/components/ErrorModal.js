import React, { Component } from 'react';
import SecurityHOC from '../HOCs/SecurityHOC';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';

class ErrorModal extends Component {
  render() {
    return (
        <Modal basic size='small'>
        <Modal.Content>
          <p>
            Food x, y and z has expired.
          </p>
        </Modal.Content>
      </Modal>
    )
  }
}

export default SecurityHOC(ErrorModal);
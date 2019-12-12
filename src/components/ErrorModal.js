import React, { Component } from 'react';
import SecurityHOC from '../HOCs/SecurityHOC';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';

class ErrorModal extends Component {
  render() {
    return (
        <Modal basic size='small'>
        <Modal.Content>
          <p>
            Your inbox is getting full, would you like us to enable automatic
            archiving of old messages?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default SecurityHOC(ErrorModal);
import React, { Component } from 'react';
import { Form, Header, Rail, Segment, Grid } from 'semantic-ui-react';

class NewFridgeForm extends Component {
  render() {
    return(
      <Grid.Column>
        <Rail position='left'>
          <Segment>
            <Form onSubmit={this.props.handleFridgeFormSubmit} size="mini">
                <Header>New Fridge:</Header>
                <Form.Input 
                  onChange={this.props.handleFridgeFormChange}
                  name="name"
                  label="Fridge Name"
                  placeholder="Food Bank Fridge"
                  required
                />
                <Form.Input
                  onChange={this.props.handleFridgeFormChange}
                  name="food_capacity" 
                  label="Food Capacity" 
                  placeholder="10" 
                  required
                />
                <Form.Input
                  onChange={this.props.handleFridgeFormChange}
                  name="drink_capacity" 
                  label="Drink Capacity" 
                  placeholder="12" 
                  required
                />
                <Form.Button type="submit">Submit</Form.Button>
                {/* https://react.semantic-ui.com/collections/form/#states-error */}
                {/* TODO: add modal */}
              </Form>
          </Segment>
        </Rail>
      </Grid.Column>
    )
  }
}

export default NewFridgeForm;
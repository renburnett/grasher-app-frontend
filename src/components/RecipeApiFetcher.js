import React, { Component } from 'react';
import { Button, Icon, Segment, Header, Grid, Modal, Image } from 'semantic-ui-react';
import recipe_default_image from '../images/recipe_default_image.png';

class RecipeApiFetcher extends Component {
  render() {
    return (
      <Segment>
        <Grid columns={2} stackable >
          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Header as="h4" color="blue">Browse recipes for food nearing expiration:</Header>
            </Grid.Column>
            <Grid.Column>
            <Modal trigger={
              <Button onClick={this.props.getRecipesForFoodItemsNearExpiry} size="big" type="submit" animated>
                <Button.Content visible>Get Recipes</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            }>
              <Modal.Header>Recipes Found</Modal.Header>
              <Modal.Content image>
                <Image wrapped size='small' src={recipe_default_image} />
                <Modal.Description>
                  <Header>Recipe One</Header>
                  <p>
                    This will be where the associated recipes pop up
                  </p>
                </Modal.Description>
              </Modal.Content>
            </Modal>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        
          
      </Segment>
    )
  }
}

export default RecipeApiFetcher;
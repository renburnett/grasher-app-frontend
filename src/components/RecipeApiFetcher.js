import React, { Component } from 'react';
import { Button, Icon, Segment, Header, Grid, Modal, Item, Dimmer, Loader } from 'semantic-ui-react';
import Recipe from '../components/Recipe';

class RecipeApiFetcher extends Component {

  displayRecipes = () => {
    return this.props.recipes.map((recipe, idx) => <Recipe recipe={recipe} key={idx}/>)
  }

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
              <Button onClick={this.props.getRecipesForFoodItemsNearExpiry} size="big" animated>
                <Button.Content visible>Get Recipes</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            }>
              {!(this.props.recipes.length > 0) ? <Dimmer active inverted> <Loader/> </Dimmer> : null}
              <Modal.Header>Recipe Ideas</Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                <Item.Group divided>
                  {this.props.recipes.length > 0 ? this.displayRecipes() : null}
                </Item.Group>
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
import React from 'react';
import { Button, Icon, Segment, Header, Grid, Modal, Item, Dimmer, Loader } from 'semantic-ui-react';
import Recipe from '../components/Recipe';

const RecipeApiFetcher = (props) => {

  const displayRecipes = () => {
    return props.recipes.map((recipe, idx) => <Recipe recipe={recipe} key={idx} />)
  }

  return (
    <Segment>
      <Grid columns={2} stackable >
        <Grid.Row verticalAlign='middle'>
          <Grid.Column>
            <Header as="h4" color="blue">Browse recipes for food nearing expiration:</Header>
          </Grid.Column>
          <Grid.Column>
            <Modal trigger={
              <Button onClick={props.getRecipesForFoodItemsNearExpiry} size="big" animated>
                <Button.Content visible>Get Recipes</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            }>
              {!(props.recipes.length > 0) ? <Dimmer active inverted> <Loader /> </Dimmer> : null}
              <Modal.Header>Recipe Ideas</Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  <Item.Group divided>
                    {props.recipes.length > 0 ? displayRecipes() : null}
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

export default RecipeApiFetcher;
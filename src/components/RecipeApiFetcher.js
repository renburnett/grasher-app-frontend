import React, { Component } from 'react';
import { Button, Icon, Segment, Header, Grid } from 'semantic-ui-react';

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
              <Button size="big" type="submit" animated>
                <Button.Content visible>Get Recipes</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default RecipeApiFetcher;
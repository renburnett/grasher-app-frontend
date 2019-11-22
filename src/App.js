import React from 'react';
import { Header, Grid, Card } from 'semantic-ui-react'
import Navbar from './components/Navbar';

function App() {

  

  return (
    <div className="App">
    <Navbar />
    <Grid stackable textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: '100vh'}}>
        <Card.Group centered>
          <Card>
            <Card.Content>
              <Header as='h2' color='teal'>Header</Header>
              Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
              dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
              Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
              Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
              viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
              Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
            </Card.Content>
          </Card>
        <Card >
          <Card.Content>
            <Header as='h2' color='teal'>Header</Header>
            Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
            dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
            Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
            Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
            viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
            Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
          </Card.Content>
        </Card>
        </Card.Group>
      </Grid.Column>
    </Grid>
    {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </div>
  );
}

export default App;

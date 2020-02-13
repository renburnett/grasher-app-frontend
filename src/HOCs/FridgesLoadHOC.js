import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const FridgesLoadHOC = WrappedComponent => {
  return class FridgeLoadHOC extends React.Component {

    fridgeCheck = () => {
      if (this.props.fridgesReady) {
        if (this.props.currentUsersFridges.length === 0) {
          return <h1>ERROR, fridges not found</h1>
        } else {
          return <WrappedComponent {...this.props}/>
        }
      } else {
        return <Dimmer active inverted> <Loader/> </Dimmer>
      }
    }
    render() {
      return this.fridgeCheck()
    }
  }
}

export default FridgesLoadHOC
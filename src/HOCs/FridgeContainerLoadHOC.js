import React, { Component } from 'react'

const FridgeContainerLoadHOC = WrappedComponent => {
  return class FridgeContainerLoadHOC extends Component {

    fridgeContainerCheck = () => {
      if (this.props.fridgesReady) {
        return <WrappedComponent {...this.props}/>
      } else {
        return <h2>Loading...</h2>
      }
    }
    render() {
      return this.fridgeContainerCheck()
    }
  }
}

export default FridgeContainerLoadHOC
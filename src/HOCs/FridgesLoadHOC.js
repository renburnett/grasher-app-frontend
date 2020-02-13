import React from 'react'

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
        return <h2>Loading...</h2>
      }
    }
    render() {
      return this.fridgeCheck()
    }
  }
}

export default FridgesLoadHOC
import React from 'react'

const FridgeLoadHOC = WrappedComponent => {
  return class FridgeLoadHOC extends React.Component {

    fridgeCheck = () => {
      if (this.props.fridgesReady) {
        if (this.props.currentFridge == null) {
          return <h1>ERROR, fridge not found</h1>
        } else {
          return <WrappedComponent {...this.props}/>
        }
      } else {
        return <h2>Loading...</h2> //TODO: add loader wheel?
      }
    }
    render(){
      return this.fridgeCheck()
    }
  }
}

export default FridgeLoadHOC
import React from 'react';

let FridgeLoadHOC = ( WrappedComponent ) => {
  return FridgeLoadHOC = ( props ) => {

    const fridgeLoaded = () => {
      return props.currentFridge ? true : false;
    }

    return(
      <> { fridgeLoaded() ? <WrappedComponent {...this.props} /> : <h2>Loading. . .</h2> } </>
    )
  }
}

export default FridgeLoadHOC;
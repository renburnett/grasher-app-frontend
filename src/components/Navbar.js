import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react';
import grash_icon from '../images/grash_icon.svg';

class Navbar extends Component {
  state = { 
    activeItem: 'home'
  }

  handleNavItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted>
        <Menu.Item 
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleNavItemClick}
        >
          <img className="app-logo" src={grash_icon}/>
        </Menu.Item>
        <Menu.Item
          name='fridges'
          active={activeItem === 'fridges'}
          onClick={this.handleNavItemClick}
        >
          My Fridges
        </Menu.Item>
        <Menu.Item
          name='account'
          active={activeItem === 'account'}
          onClick={this.handleNavItemClick}
        >
          Account
        </Menu.Item>
      </Menu>
    )
  }
}

export default Navbar

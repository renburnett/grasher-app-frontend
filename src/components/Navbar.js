import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import grash_icon from '../images/grash_icon.svg';

class Navbar extends Component {
  state = { 
    activeItem: ''
  }

  handleNavItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted>
        <Menu.Item 
          as={Link}  //this is how we add our Router Link
          to='/'
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleNavItemClick}
        >
          <img alt="grasher app icon" src={grash_icon}/>
        </Menu.Item>
        <Menu.Item
          as={Link}
          to='/fridges'
          name='fridges'
          active={activeItem === 'fridges'}
          onClick={this.handleNavItemClick}
        >
          My Fridges
        </Menu.Item>
        <Menu.Item
          as={Link}
          to='/account'
          name='account'
          active={activeItem === 'account'}
          onClick={this.handleNavItemClick}
        >
          Account
        </Menu.Item>
        <Menu.Item
          as={Link}
          to='/login'
          name='logout'
          active={activeItem === 'logout'}
          onClick={this.handleNavItemClick}
        >
          Logout
        </Menu.Item>
      </Menu>
    )
  }
}

export default Navbar;

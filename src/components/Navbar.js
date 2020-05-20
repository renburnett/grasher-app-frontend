import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import grash_icon from '../images/grash_icon.svg';

const Navbar = (props) => {
  const [activeItem, setActiveItem] = useState('');

  const handleNavItemClick = (e, { name }) => {
    setActiveItem(name);
    if (name === 'logout') { props.handleLogout(); }
  }

  return (
    <Menu inverted>
      <Menu.Item
        as={Link}
        to='/'
        name='home'
        active={activeItem === 'home'}
        onClick={handleNavItemClick}
      >
        <img className="grasher_icon" alt="grasher app icon" src={grash_icon} />
      </Menu.Item>
      <Menu.Item
        as={Link}
        to='/fridges'
        name='fridges'
        active={activeItem === 'fridges'}
        onClick={handleNavItemClick}
      >
        My Fridges
      </Menu.Item>
      <Menu.Item
        as={Link}
        to='/new_fridge'
        name='new_fridge'
        active={activeItem === 'new_fridge'}
        onClick={handleNavItemClick}
      >
        Add Fridge
      </Menu.Item>
      <Menu.Item
        as={Link}
        to='/account'
        name='account'
        active={activeItem === 'account'}
        onClick={handleNavItemClick}
      >
        Account
      </Menu.Item>
      <Menu.Item
        as={Link}
        to='/login'
        name='logout'
        active={activeItem === 'logout'}
        onClick={handleNavItemClick}
      >
        Logout
      </Menu.Item>
    </Menu>
  )
}

export default Navbar;

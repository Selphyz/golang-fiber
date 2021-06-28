import React from 'react'
import { NavLink } from 'react-router-dom';

export const Menu = () => {
    return (
      <nav id='sidebarMenu' className='col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse'>
        <div className='position-sticky pt-3'>
          <ul className='nav flex-column'>
            <li className='nav-item'>
              <NavLink exact activeClassName='activeroute' className='nav-link' aria-current='page' to={'/'}>
                Dashboard
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink activeClassName='activeroute' className='nav-link' aria-current='page' to={'/users'}>
                Users
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink activeClassName='activeroute' className='nav-link' aria-current='page' to={'/roles'}>
                Roles
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
}

export default Menu;

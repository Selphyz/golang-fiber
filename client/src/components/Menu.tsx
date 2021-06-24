import React from 'react'
import { Link } from 'react-router-dom';

export const Menu = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to={"/"}>
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to={"/users"}>
                            Users
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Menu;

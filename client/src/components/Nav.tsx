import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IUser, User } from '../model/User';
import './style/Nav.css'

export const Nav = () => {
    const [user, setUser] = useState<IUser>(new User());
    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get<IUser>("user");
                setUser(new User(
                    data.id,
                    data.email,
                    data.first_name,
                    data.last_name
                ));
            }
        )();
    }, []);
    const logout = () => {
        axios.post("logout", {});
        setUser(new User())
    }
    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
            <ul className="my-2 my-md-0 mr-md-3">
                <Link className="p-2 text-white" to="/profile">{user?.first_name}</Link>
                {user.id ? <span className="p-2 text-white logout" onClick={logout}>Sign out</span> :
                    <Link className="p-2 text-white" to="/login">Login</Link>}
            </ul>
        </nav>
    )
}

export default Nav;

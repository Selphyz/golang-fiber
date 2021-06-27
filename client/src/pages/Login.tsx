import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react'
import { Redirect } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [redirect, setRedirect] = useState<boolean>(false);
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post("login", {
            email,
            password
        });
        setRedirect(true);
    }
    return (redirect) ? <Redirect to="/" /> :
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Log in Page</h1>
                <input type="email" className="form-control" placeholder="Email"
                    onChange={e => setEmail(e.target.value)} />
                <input type="password" className="form-control" placeholder="Password"
                    onChange={e => setPassword(e.target.value)} />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Log in</button>
            </form>
        </main>
}

export default Login

import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios';
import "./style/Register.css"
import { Redirect } from 'react-router-dom';

export const Register = () => {
    const [first_name, setFirst_name] = useState<string>("");
    const [last_name, setLast_name] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password_confirm, setPassword_confirm] = useState<string>("");
    const [redirect, setRedirect] = useState<boolean>(false)
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log({
            first_name,
            last_name,
            email,
            password,
            password_confirm
        });
        const { data } = await axios.post("register", {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            password_confirm: password_confirm
        });
        console.log(data);
        setRedirect(true);
    }
    return (redirect) ? <Redirect to={"/login"} /> :
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <input className="form-control" placeholder="First Name"
                    onChange={e => setFirst_name(e.target.value)} />
                <input className="form-control" placeholder="Last Name"
                    onChange={e => setLast_name(e.target.value)} />
                <input type="email" className="form-control" placeholder="Email"
                    onChange={e => setEmail(e.target.value)} />
                <input type="password" className="form-control" placeholder="Password"
                    onChange={e => setPassword(e.target.value)} />
                <input type="password" className="form-control" placeholder="Password Confirm"
                    onChange={e => setPassword_confirm(e.target.value)} />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
            </form>
        </main>
}

export default Register

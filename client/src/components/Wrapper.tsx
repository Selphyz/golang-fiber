import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { Nav, Menu } from '../components'

export const Wrapper = (props: any) => {
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        (
            async () => {
                try {
                    await axios.get("user");
                } catch {
                    setRedirect(true);
                }
            }
        )();
    }, []);
    return (redirect) ? <Redirect to="login" /> : (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <Menu />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Wrapper;
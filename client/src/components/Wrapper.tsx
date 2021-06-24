import React from 'react'
import { Nav, Menu } from '../components'

export const Wrapper = (props: any) => {
    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <Menu />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Wrapper

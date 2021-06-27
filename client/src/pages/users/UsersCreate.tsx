import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { Wrapper } from '../../components'
import { IRole, Role } from '../../model/Role';
import '../style/UsersCreate.css'

const UsersCreate = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role_id, setRoleID] = useState<number>();
    const [roles, setRoles] = useState<IRole[]>();
    const [redirect, setRedirect] = useState<boolean>(false);
    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('roles');
                setRoles(data);
            }
        )()
    }, []);
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('users', {
            first_name,
            last_name,
            email,
            role_id
        });
        setRedirect(true);
    }
    return (redirect) ? <Redirect to="/users" /> :
        <Wrapper>
            <form className="create-user-form" onSubmit={submit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input type="text" className="form-control" onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input type="text" className="form-control" onChange={e => setLastName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="text" className="form-control" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control" onChange={e => setRoleID(parseInt(e.target.value))}>
                        {roles?.map((r: Role) => {
                            return (<option key={r.id} value={r.id}>{r.name}</option>)
                        })}
                    </select>
                </div>
                <button className="btn btn-outline-secondary">Create User</button>
            </form>
        </Wrapper>
}

export default UsersCreate

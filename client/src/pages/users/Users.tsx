import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Wrapper } from '../../components'
import { User } from '../../model/User'

export const Users = () => {
    const [users, setUsers] = useState<User[]>()
    useEffect(() => {
        (
            async () => {
                const { data: { data } } = await axios.get("users");
                setUsers(data)
            }
        )()
    }, [])
    return (
        <Wrapper>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user: User) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role.name}</td>
                                    <td></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )
}

export default Users
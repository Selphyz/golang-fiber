import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Wrapper } from '../../components'
import { FetchUsers, IUser, User } from '../../model/User'

export const Users = () => {
    const [users, setUsers] = useState<IUser[]>()
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get<FetchUsers>(`users?page=${page}`);
                setUsers(data.data)
                setLastPage(data.meta.last_page)
            }
        )()
    }, [page])
    const next = () => {
        if (page < lastPage) {
            setPage(page + 1)
        }
    }
    const prev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
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
                        {users?.map((user: IUser) => {
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
            <nav>
                <ul>
                    <li><span className="page-link" onClick={prev}>Previous</span></li>
                    <li><span className="page-link" onClick={next}>Next</span></li>
                </ul>
            </nav>
        </Wrapper>
    )
}

export default Users

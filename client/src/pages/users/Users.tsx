import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Paginator, Wrapper } from '../../components';
import { FetchUsers, IUser } from '../../model/User';
import '../style/Users.css';

export const Users = () => {
  const [users, setUsers] = useState<IUser[]>();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get<FetchUsers>(`users?page=${page}`);
      setUsers(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page]);
  const del = async (id: number) => {
    if (window.confirm('Are yousure you want to delete this record')) {
      await axios.delete(`users/${id}`);
      setUsers(users?.filter((u: IUser) => u.id !== id));
    }
  };
  return (
    <Wrapper>
      <div className='pt-3 pb-2 mb-3 border-bottom'>
        <Link to='/users/create' className='btn btn-sm btn-outline-secondary'>
          Add
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped table-sm'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Role</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: IUser) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role.name}</td>
                  <td>
                    <div className='btn-group mr-2'>
                      <Link className='button btn btn-sm btn-info' to={`/users/${user.id}/edit`}>
                        Edit
                      </Link>
                      <span className='button btn btn-sm btn-danger' onClick={() => del(user.id)}>
                        Delete
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
    </Wrapper>
  );
};

export default Users;

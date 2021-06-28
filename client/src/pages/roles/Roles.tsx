import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from '../../components';
import { IRole } from '../../model/Role';

export const Roles = () => {
  const [roles, setRoles] = useState<IRole[]>();
  const del = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      await axios.delete(`roles/${id}`);
      setRoles(roles?.filter((r: IRole) => r.id !== id));
    }
  };
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('roles');
      setRoles(data);
    })();
  }, []);
  return (
    <Wrapper>
      <div className='table-responsive'>
        <table className='table table-striped table-sm'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles?.map((role) => {
              return (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>{role.id}</td>
                  <td>
                    <div className='btn-group mr-2'>
                      <Link className='button btn btn-sm btn-info' to={`/users/${role.id}/edit`}>
                        Edit
                      </Link>
                      <span className='button btn btn-sm btn-danger' onClick={() => del(role.id)}>
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
    </Wrapper>
  );
};

export default Roles;

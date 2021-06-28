import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Wrapper } from '../../components';
import { IRole, Role } from '../../model/Role';
import { IUser } from '../../model/User';
import '../style/UsersCreate.css';

interface RouterProps {
  id: string;
}
interface IUserEdit extends RouteComponentProps<RouterProps> {}
export const UserEdit: React.FC<IUserEdit> = (props) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role_id, setRoleID] = useState<number>();
  const [roles, setRoles] = useState<IRole[]>();
  const [redirect, setRedirect] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const roles = await axios.get('roles');
      setRoles(roles.data);
      const { data } = await axios.get<IUser>(`users/${props.match.params.id}`);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setRoleID(data.role.id);
    })();
  }, [props.match.params.id]);
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put(`users/${props.match.params.id}`, {
      first_name,
      last_name,
      email,
      role_id,
    });
    setRedirect(true);
  };
  return redirect ? (
    <Redirect to='/users' />
  ) : (
    <Wrapper>
      <form className='create-user-form' onSubmit={submit}>
        <div className='mb-3'>
          <label>First Name</label>
          <input
            type='text'
            className='form-control'
            defaultValue={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label>Last Name</label>
          <input
            type='text'
            className='form-control'
            defaultValue={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label>Email</label>
          <input type='text' className='form-control' defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='mb-3'>
          <label>Role</label>
          <select className='form-control' value={role_id} onChange={(e) => setRoleID(parseInt(e.target.value))}>
            {roles?.map((r: Role) => {
              return (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              );
            })}
          </select>
        </div>
        <button className='btn btn-outline-secondary'>Edit User</button>
      </form>
    </Wrapper>
  );
};

export default UserEdit;

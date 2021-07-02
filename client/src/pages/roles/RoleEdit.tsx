import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Wrapper } from '../../components';
import { IPermission } from '../../model/Permission';

interface RouterProps {
  id: string;
}
interface IRoleEdit extends RouteComponentProps<RouterProps> {}
export const RoleEdit: React.FC<IRoleEdit> = (props) => {
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [name, setName] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const check = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }
    setSelected([...selected, id]);
  };
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put(`roles/${props.match.params.id}`, {
      name,
      permissions: selected,
    });
    console.log(name);
    console.log(selected);
    setRedirect(true);
  };
  useEffect(() => {
    (async () => {
      const response = await axios.get('permissions');
      setPermissions(response.data);
      const { data } = await axios.get(`roles/${props.match.params.id}`);
      console.log(data);
      setName(data.name);
      setSelected(data.permissions.map((p: IPermission) => p.id));
    })();
  }, []);
  return redirect ? (
    <Redirect to='/roles' />
  ) : (
    <Wrapper>
      <form onSubmit={submit}>
        <div className='mb-3 mt-3 row'>
          <label htmlFor='' className='col-sm-2 col-form-label'></label>
          <div className='col-sm-10'>
            <input type='text' defaultValue={name} className='form-control' onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <div className='mb-3 row'>
          <label className='col-sm-2 col-form-label'>Permissions</label>
          <div className='col-sm-10'>
            {permissions.map((p: IPermission) => {
              return (
                <div className='form-check form-check-inline col-3' key={p.id}>
                  <input
                    type='checkbox'
                    checked={selected.some((s) => s === p.id)}
                    className='form-check-input'
                    value={p.id}
                    onChange={() => check(p.id)}
                  />
                  <label className='form-check-label'>{p.name}</label>
                </div>
              );
            })}
          </div>
        </div>
        <button className='btn btn-secondary px-4 py-2'>Save</button>
      </form>
    </Wrapper>
  );
};

export default RoleEdit;

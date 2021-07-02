import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Dashboard, Login, Register, RoleCreate, RoleEdit, Roles, UserCreate, UserEdit, Users } from './pages';
import './App.css';

export const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Route path={'/'} exact component={Dashboard} />
        <Route path={'/register'} component={Register} />
        <Route path={'/login'} component={Login} />
        <Route path={'/users'} exact component={Users} />
        <Route path={'/users/create'} component={UserCreate} />
        <Route path={'/users/:id/edit'} component={UserEdit} />
        <Route path={'/roles'} exact component={Roles} />
        <Route path={'/roles/create'} exact component={RoleCreate} />
        <Route path={'/roles/:id/edit/'} exact component={RoleEdit} />
      </BrowserRouter>
    </div>
  );
}

export default App;

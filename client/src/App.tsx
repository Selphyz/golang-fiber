import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Dashboard, Login, Register, Users } from './pages';
import './App.css';
import UsersCreate from './pages/users/UsersCreate';

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={"/"} exact component={Dashboard} />
        <Route path={"/users"} exact component={Users} />
        <Route path={"/register"} component={Register} />
        <Route path={"/login"} component={Login} />
        <Route path={"/users/create"} component={UsersCreate} />
      </BrowserRouter>
    </div>
  );
}

export default App;

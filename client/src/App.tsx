import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Dashboard, Login, Register, Users } from './pages';

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={"/"} exact component={Dashboard} />
        <Route path={"/users"} component={Users} />
        <Route path={"/register"} component={Register} />
        <Route path={"/login"} component={Login} />
      </BrowserRouter>
    </div>
  );
}

export default App;

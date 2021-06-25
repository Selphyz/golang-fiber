import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Dashboard, Login, Register, Users } from './pages';
import './App.css';

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

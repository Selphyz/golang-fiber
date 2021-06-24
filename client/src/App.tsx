import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Dashboard, Register, Users } from './pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={"/"} exact component={Dashboard} />
        <Route path={"/users"} component={Users} />
        <Route path={"/register"} component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;

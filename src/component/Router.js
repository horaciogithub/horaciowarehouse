import React, { useState, useEffect } from "react";
import Drawer from './Drawer';
import Items from './Items';
import Boxes from './Boxes';
import { Route, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const [route, setRoute] = useState('/');

  useEffect(() => {
    if(route === '/') setRoute('/')
    if(route === '/boxes')  setRoute('/boxes')
  }, [route])

  const switchRoute = (path) => {
    setRoute(path)
  }

  return (
    <div className="container">
      <Drawer switchRoute={switchRoute}/>
      <Router>
          {route !== '/boxes' ? 
          <Route exact path='/' component={Items} /> : 
          <Route path='/' component={Boxes} />}
      </Router>
    </div>
  );
}

export default App;

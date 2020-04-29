import React from 'react';
import { HashRouter, Route } from 'react-router-dom'
import './App.css';
import HomeView from './views/HomeView'

function App() {
  return (
    <HashRouter>
      <Route path="/" component={HomeView}></Route>
    </HashRouter>
  );
}

export default App;

import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './components/Home';
import Produtos from './components/Produtos';

const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/produtos" component={Produtos}/>
    </div>
  </Router>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)
export default BasicExample
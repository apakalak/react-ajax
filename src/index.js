import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import About from './components/About';
import Faq from './components/Faq';
import Home from './components/Home';
import Boxes from './components/boxes/Boxes';
import Random from './components/Random';
import CurrencyConverter from './components/CurrencyConverter'
import {Router,Route,IndexRoute,browserHistory} from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/"  component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About}/>
      <Route path="faq" component={Faq}/>
      <Route path="boxes" component={Boxes}/>
      <Route path="random" component={Random}/>
      <Route path="converter" component={CurrencyConverter}/>
    </Route>
  </Router>,

  document.getElementById('root')
);

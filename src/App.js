import React from 'react';
// import { Button, Table, Form, FormGroup } from 'reactstrap';

import {Route,Link,BrowserRouter,Switch} from 'react-router-dom';

import "./style.css"; 

import Main from './Main'
import Home from './Home';
import About from './About';
import Posts from './Posts';
import Post from './Post';
import users from './users';
import Nomatch from './Nomatch';


function App() {
  return (

  <BrowserRouter>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link> 
      <Link to="/posts">Post</Link>
      <Link to="/users">Users</Link>
      {/*<Link to="/main"> Main </Link> */}

    
    <Switch>
       <Route exact path="/" component ={Main}/>
       <Route path="/home"   component ={Home}/>
       <Route path="/about"  component ={About}/>
       <Route exact path="/posts/:id" component={Post}/>
       <Route path="/posts"  component ={Posts}/> 
       <Route exact path="/users"  component={users}/>
       <Route path="*"       component={Nomatch}/>
    </Switch>    
  </BrowserRouter>
   
  );
}

export default App;
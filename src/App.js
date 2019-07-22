import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import CloudPoint from "./components/cloudpoint/cloudPoint"
import Photo from "./components/photo/photo"

export default class App extends Component{


  render(){
    return (
      <div id="main">
        <CloudPoint/>
        <Photo/>
      </div>
    )
  }
}

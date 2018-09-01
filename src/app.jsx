import React from 'react';
import ReactDOM from 'react-dom';
import * as service from "./js/service";
import {TreeView} from './js/aria';
import {Keyboard} from './js/support';

//styles
import './css/_app.scss';

service.findAll()
    .then(empData => {
        ReactDOM.render(
          <TreeView nodes={empData} />,
            document.getElementById('root'),              
        );  
        ReactDOM.render(
          <Keyboard />,
          document.getElementById('instructions')   
          
        )            
    })
    .catch(error => console.log(error));








import React from 'react';
import ReactDOM from 'react-dom';
import * as service from "./js/service";
import {TreeView} from './js/aria';

//styles
import './css/_app.scss';

service.findAll()
    .then(empData => {
        ReactDOM.render(
          <TreeView nodes={empData} />,
            document.getElementById('root')  
        );        
    })
    .catch(error => console.log(error));








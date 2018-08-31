import React from 'react';
import ReactDOM from 'react-dom';
import * as service from "./js/service";
import {TreeView} from './js/events';

//styles
import './css/_app.scss';

/*
var nodes = [
	{id:0, name:'projects', parent:'', visable: true, expanded:false, focus:false, groups:[1,2,3,7,8], tabIndex:0 },
	{id:1, name:'doc1', parent:0, visable: false, focus:false, tabIndex:-1 },
	{id:2, name:'doc2', parent:0, visable: false, focus:false, tabIndex:-1 },
	{id:3, name:'project1', parent:0, visable: false,  expanded:false, focus:false, groups:[4,5,6], tabIndex:-1 },
	{id:4, name:'doc1A', parent:3,  visable: false, focus:false, tabIndex:-1 },
	{id:5, name:'doc1B', parent:3,  visable: false, focus:false, tabIndex:-1 },
	{id:6, name:'doc1C', parent:3, visable: false,  focus:false, tabIndex:-1 },
	{id:7, name:'doc3', parent:0, visable: false, focus:false, tabIndex:-1 },
	{id:8, name:'project2', parent:0, visable: false,  expanded:false, focus:false, groups:[9,10], tabIndex:-1 },
	{id:9, name:'doc2A', parent:8, visable: false, focus:false, tabIndex:-1 },
	{id:10, name:'doc2B', parent:10, visable: false, focus:false, tabIndex:-1 },	
	{id:11, name:'letters', parent:'', visable: true,  expanded:false, focus:false, groups:[12], tabIndex:-1 },
	{id:12, name:'letters', parent: 11, visable: false,  expanded:false, focus:false, groups:[13], tabIndex:-1 },
	{id:13, name:'lettersB', parent:12, visable: false, focus:false, tabIndex:-1 },	
];
console.log(JSON.stringify(nodes));
*/

service.findAll( )
    .then(empData => {
        //this.buildEventsList( empData );
        console.log(empData);
        ReactDOM.render(
          <TreeView nodes={empData} />,
            document.getElementById('root')  
        );        
    })
    .catch(error => console.log(error));








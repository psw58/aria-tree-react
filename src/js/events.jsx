import React, { Component } from 'react';

var nodes = [
	{type:'root', parent:'', isParent:true, expanded:false }
];


export class TreeView extends Component {
	constructor(props) {
		super(props);
		//create a state variable that holds the data query
		this.state = {
		  nodes: nodes
		};
		console.log(this.state.nodes[0].expanded);
		console.log(this.state.nodes[0].type);
	  }  

	btnClickEvent( myId ){
		console.log('You clicked me id='+myId);
		console.log(this.state.nodes[0].expanded)
		this.state.nodes[0].expanded = !this.state.nodes[0].expanded;
		this.setState({nodes: nodes});

	}

	render() {
		return (
			/*
			<button 
				//need to research what is passed here?
				onClick={(reactEvent) => this.btnClickEvent(reactEvent)}
			>Click Me
			</button>
			*/
			<div>
			<h2 id="tree_label">
			  Tree View
			</h2>
			<ul role="tree" aria-labelledby="tree_label">
			  <li key={0} role="treeitem" aria-expanded={this.state.nodes[0].expanded} tabIndex="0" onClick={(reactEvent) => this.btnClickEvent(reactEvent)}>
				<span>
				  Projects
				</span>
				<ul role="group">
				  <li role="treeitem" className="doc" tabIndex="-1">
					project-1.docx
				  </li>
				  <li role="treeitem" className="doc" tabIndex="-1">
					project-2.docx
				  </li>
				  <li role="treeitem" aria-expanded="false" tabIndex="-1">
					<span>
					  Project 3
					</span>
					<ul role="group">
					  <li role="treeitem" className="doc" tabIndex="-1">
						project-3A.docx
					  </li>
					  <li role="treeitem" className="doc" tabIndex="-1">
						project-3B.docx
					  </li>
					  <li role="treeitem" className="doc" tabIndex="-1">
						project-3C.docx
					  </li>
					</ul>
				  </li>
				  <li role="treeitem" className="doc" tabIndex="-1">
					project-4.docx
				  </li>
				  <li role="treeitem" aria-expanded="false" tabIndex="-1">
					<span>
					  Project 5
					</span>
					<ul role="group">
					  <li role="treeitem" className="doc" tabIndex="-1">
						project-5A.docx
					  </li>
					  <li role="treeitem" className="doc" tabIndex="-1">
						project-5B.docx
					  </li>
					  <li role="treeitem" className="doc">
						project-5C.docx
					  </li>
					  <li role="treeitem" className="doc" tabIndex="-1">
						project-5D.docx
					  </li>
					  <li role="treeitem" className="doc">
						project-5E.docx
					  </li>
					  <li role="treeitem" className="doc" tabIndex="-1">
						project-5F.docx
					  </li>
					</ul>
				  </li>
				</ul>
			  </li>
			</ul>
		  </div>

		);
	}
}



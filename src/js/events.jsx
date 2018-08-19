import React, { Component } from 'react';
//import KeyboardEventHandler from 'react-keyboard-event-handler';

var nodes = [
	{id:0, type:'root', parent:'', isParent:true, expanded:false, focus:false }
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

	btnClickEvent( event ){
		event.preventDefault();
		console.log(event.target);
		console.log('You clicked me ');
		console.log(this.state.nodes[0].expanded)
		if (event.target.id == "span0"){
			this.state.nodes[0].expanded = !this.state.nodes[0].expanded;
			
		}
		
		this.setState({nodes: this.state.nodes});

	}

	onFocus (e){
		this.state.nodes[0].focus = true;
		this.setState({nodes: this.state.nodes});
	}

	onBlur(e){
		this.state.nodes[0].focus = false;
		this.setState({nodes: this.state.nodes});
	}

	onKeyPressed(e){
		switch(e.key) {
			case 'Enter':
			this.state.nodes[0].expanded = !this.state.nodes[0].expanded 
				break;
			default:
			console.log(e.key);
		}		
		this.setState({nodes: this.state.nodes});
	}

	render() {
		return (
			<div>
			<h2 id="tree_label">
			  Tree View
			</h2>
			<ul role="tree" aria-labelledby="tree_label">
			  <li role="treeitem"
					key={"1"}
				  	aria-expanded={this.state.nodes[0].expanded} 
					tabIndex={this.state.nodes[0].id}  
					onClick={(e) => this.btnClickEvent(e)}
					onFocus={ (e) => this.onFocus(e) }
					onBlur={ (e) => this.onBlur(e) }
					onKeyDown={(e) => this.onKeyPressed(e)}
				
				>
					<span 
						className={this.state.nodes[0].focus ? 'focus' : '' } 
						id={'span'+this.state.nodes[0].id} 
					>
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



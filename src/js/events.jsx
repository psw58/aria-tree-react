import React, { Component } from 'react';
import ReactDOM from 'react';
//import KeyboardEventHandler from 'react-keyboard-event-handler';

var nodes = [
	{id:0, name:'root', type:'root', parent:'', isParent:true, expanded:false, focus:false, children:[1,2,3,4,5], tabIndex:0 },
	{id:1, name:'', type:'child', parent:0, isParent:false, focus:false, tabIndex:-1 }
];


export class TreeView extends Component {
	constructor(props) {
		super(props);
		//create a state variable that holds the data query
		this.state = {
		  nodes: nodes,
		  tid:0
		};
		console.log(this.state.nodes[this.state.tid].expanded);
		console.log(this.state.nodes[this.state.tid].type);
	  }  

	onClickEvent( event ){
		event.preventDefault();
		console.log(event.target);
		//console.log(this.state.nodes[this.state.tid].expanded)
		if (event.target.id == "span"+this.state.tid){
			this.state.nodes[this.state.tid].expanded = !this.state.nodes[this.state.tid].expanded;
			
		}
		
		this.setState({nodes: this.state.nodes});

	}

	onFocusEvent (e){
		this.state.nodes[this.state.tid].focus = true;
		this.setState({nodes: this.state.nodes});
	}

	onBlurEvent(e){
		this.state.nodes[this.state.tid].focus = false;
		this.setState({nodes: this.state.nodes});
	}

	onKeyPressedEvent(e){
		switch(e.key) {
			case 'Enter':
				if ( 'expanded' in this.state.nodes[this.state.tid] ){
					this.state.nodes[this.state.tid].expanded = !this.state.nodes[this.state.tid].expanded 
				}else{
					console.log('element can not expand');
				}
				break;
			case 'ArrowDown':
				//remove focus from last element
				this.state.nodes[this.state.tid].tabIndex = -1;
				this.refs[this.state.tid].blur()
				//update current target id
				if (nodes.length > this.state.tid+1){
					this.state.tid += 1;
				}else{
					//loop back to begining node
					console.log("end of nodes looping to top'");
					this.state.tid = 0
				}
				//set focus to this element
				this.refs[this.state.tid].focus()
				this.state.nodes[this.state.tid].tabIndex = 0;
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
					key={this.state.nodes[0].id}
				  	aria-expanded={this.state.nodes[0].expanded} 
					tabIndex={this.state.nodes[0].tabIndex}  
					onClick={(e) => this.onClickEvent(e)}
					onFocus={ (e) => this.onFocusEvent(e) }
					onBlur={ (e) => this.onBlurEvent(e) }
					onKeyDown={(e) => this.onKeyPressedEvent(e)}
					ref={this.state.nodes[0].id}
				>
					<span 
						className={this.state.nodes[0].focus ? 'focus' : '' } 
						id={'span'+this.state.nodes[0].id} 
					>
						Projects
					</span>
				<ul role="group">
				  <li role="treeitem" 
					  className="doc" 
					  key = {this.state.nodes[1].id} 
					  tabIndex={this.state.nodes[1].tabIndex}
					  className={this.state.nodes[1].focus ? 'focus' : '' } 
					  ref={this.state.nodes[1].id}
				>
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



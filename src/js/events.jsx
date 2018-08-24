import React, { Component } from 'react';
import ReactDOM from 'react';
//import KeyboardEventHandler from 'react-keyboard-event-handler';

var nodes = [
	{id:0, name:'root', type:'root', parent:'', isParent:true, expanded:false, focus:false, groups:[1,2,3,7,8], tabIndex:0 },
	{id:1, name:'', type:'child', parent:0,  isParent:false, focus:false, tabIndex:-1 },
	{id:2, name:'', type:'child', parent:0,  isParent:false, focus:false, tabIndex:-1 },
	{id:3, name:'', type:'', parent:'', isParent:true, expanded:false, focus:false, groups:[4,5,6], tabIndex:-1 },
	{id:4, name:'', type:'child', parent:3,  isParent:false, focus:false, tabIndex:-1 },
	{id:5, name:'', type:'child', parent:3,  isParent:false, focus:false, tabIndex:-1 },
	{id:6, name:'', type:'child', parent:3,  isParent:false, focus:false, tabIndex:-1 },
	{id:7, name:'', type:'child', parent:3,  isParent:false, focus:false, tabIndex:-1 },
	{id:8, name:'', type:'', parent:'', isParent:true, expanded:false, focus:false, groups:[9,10], tabIndex:-1 },
	{id:9, name:'', type:'child', parent:9,  isParent:false, focus:false, tabIndex:-1 },
	{id:10, name:'', type:'child', parent:10,  isParent:false, focus:false, tabIndex:-1 },	
];

/*
	FOCUS Management:
	When a single-select tree receives focus:
		If none of the nodes are selected before the tree receives focus, focus is set on the first node.
		If a node is selected before the tree receives focus, focus is set on the selected node.
	When a multi-select tree receives focus:
		If none of the nodes are selected before the tree receives focus, focus is set on the first node.
		If one or more nodes are selected before the tree receives focus, focus is set on the first selected node.
*/	
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
		//@TODO if this element does not have focus give it focus
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
		//return to this node @todo this needs testing
		this.state.nodes[this.state.tid].tabIndex = 0;
		this.setState({nodes: this.state.nodes});
	}

	onKeyPressedEvent(e){
		switch(e.key) {
			/* ENTER KEY:
				activates a node, i.e., performs its default action. 
				For parent nodes, one possible default action is to open or close the node. 
				In single-select trees where selection does not follow focus (see https://www.w3.org/TR/wai-aria-practices-1.1/#issue-container-generatedID-27), 
				the default action is typically to select the focused node.
			*/
			case 'Enter':
				if ( 'expanded' in this.state.nodes[this.state.tid] ){
					this.state.nodes[this.state.tid].expanded = !this.state.nodes[this.state.tid].expanded 
				}else{
					//@todo set focus to this element
					console.log('element can not expand');
				}
				break;
			/* Down Arrow: 
				Moves focus to the next node that is focusable without opening or closing a node.
			*/
			case 'ArrowDown':
				//@todo this should only move to child element if it is visable
				//remove focus from last element
				this.state.nodes[this.state.tid].tabIndex = -1;
				this.refs[this.state.tid].blur()
				//@TOD UPDATE THE TARGET ONLY IF ITS VISABLE
				//update current target id
				if (nodes.length > this.state.tid+1){
					this.state.tid += 1;
				}else{
					//loop back to begining node
					console.log("end of nodes looping to top");
					this.state.tid = 0
				}
				//set focus to this element
				this.refs[this.state.tid].focus()
				this.state.nodes[this.state.tid].tabIndex = 0;
				break;
			/* Up Arrow: 
				Moves focus to the previous node that is focusable without opening or closing a node.
			*/
			case 'ArrowUp':
				//@todo this should only move to child element if it is visable
				//remove focus from last element
				this.state.nodes[this.state.tid].tabIndex = -1;
				this.refs[this.state.tid].blur();
				//update current target id
				//@TOD0 UPDATE THE TARGET ONLY IF ITS VISABLE
				if (this.state.tid > 0){
					this.state.tid -= 1;
				}else{
					//loop back to begining node
					console.log("beggining of nodes looping to botttom");
					this.state.tid = nodes.length-1
				}
				//set focus to this element
				this.refs[this.state.tid].focus()
				this.state.nodes[this.state.tid].tabIndex = 0;
				break;
			/* Right arrow:
				When focus is on a closed node, opens the node; focus does not move.
				When focus is on a open node, moves focus to the first child node.
				When focus is on an end node, does nothing.	
			*/				
			case 'ArrowRight':	
				console.log('not implimented');
				break;
			/* Left arrow:
				When focus is on an open node, closes the node.
				When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
				When focus is on a root node that is also either an end node or a closed node, does nothing.
			*/
			case 'ArrowLeft':	
				console.log('not implimented');
				break;				
			/* Home: 
				Moves focus to the first node in the tree without opening or closing a node.
			*/
			case 'Home':	
				console.log('not implimented');
				break;	
			/* End: 
				Moves focus to the last node in the tree that is focusable without opening a node.
			*/
			case 'End':	
				console.log('not implimented');
				break;	
			/* Type-ahead is recommended for all trees, especially for trees with more than 7 root nodes:
				Type a character: 
					focus moves to the next node with a name that starts with the typed character.
				Type multiple characters in rapid succession: 
					focus moves to the next node with a name that starts with the string of characters typed.
				* (Optional): Expands all siblings that are at the same level as the current node.
			*/			
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
			<ul role="tree" aria-labelledby="tree_label"
				onClick={(e) => this.onClickEvent(e)}
				onFocus={ (e) => this.onFocusEvent(e) }
				onBlur={ (e) => this.onBlurEvent(e) }
				onKeyDown={(e) => this.onKeyPressedEvent(e)}
			>
				{/* the root element */}
			  	<li role="treeitem"
					key={this.state.nodes[0].id}
				  	aria-expanded={this.state.nodes[0].expanded} 
					tabIndex={this.state.nodes[0].tabIndex}  
					ref={this.state.nodes[0].id}
				>
					<span 
						className={this.state.nodes[0].focus ? 'focus' : ''} 
						id={'span'+this.state.nodes[0].id} 
					>
						Projects
					</span>
				{/* this group is controlled by root */}
				<ul role="group">
				  <li role="treeitem" 
					  tabIndex={this.state.nodes[1].tabIndex}
					  className={this.state.nodes[1].focus ? 'focus doc' : 'doc' } 
					  ref={this.state.nodes[1].id}
				>
					project-1.docx
				  </li>
				  <li role="treeitem" 
					  tabIndex={this.state.nodes[2].tabIndex}
					  className={this.state.nodes[2].focus ? 'focus doc' : 'doc' } 
					  ref={this.state.nodes[2].id}
				>
					project-2.docx
				  </li>
				  <li role="treeitem" 
						aria-expanded={this.state.nodes[3].expanded} 
						tabIndex={this.state.nodes[3].tabIndex}  
						ref={this.state.nodes[3].id}
				  >
					<span
						className={this.state.nodes[3].focus ? 'focus' : ''} 
						id={'span'+this.state.nodes[3].id} 
					>
					  Project 3
					</span>
					<ul role="group">
					  <li role="treeitem" 
						tabIndex={this.state.nodes[4].tabIndex}
						className={this.state.nodes[4].focus ? 'focus doc' : 'doc' } 
						ref={this.state.nodes[4].id}			  
					  >
						project-3A.docx
					  </li>
					  <li role="treeitem" 
						tabIndex={this.state.nodes[5].tabIndex}
						className={this.state.nodes[5].focus ? 'focus doc' : 'doc' } 
						ref={this.state.nodes[5].id}	
						>
						project-3B.docx
					  </li>
					  <li role="treeitem" 
						tabIndex={this.state.nodes[6].tabIndex}
						className={this.state.nodes[6].focus ? 'focus doc' : 'doc' } 
						ref={this.state.nodes[6].id}	
					  >
						project-3C.docx
					  </li>
					</ul>
				  </li>
				  <li role="treeitem" 
						tabIndex={this.state.nodes[7].tabIndex}
						className={this.state.nodes[7].focus ? 'focus doc' : 'doc' } 
						ref={this.state.nodes[7].id}	
					  >
					project-4.docx
				  </li>
				  <li role="treeitem" 
						aria-expanded={this.state.nodes[8].expanded} 
						tabIndex={this.state.nodes[8].tabIndex}  
						ref={this.state.nodes[8].id}
				  >
					<span
						className={this.state.nodes[8].focus ? 'focus' : ''} 
						id={'span'+this.state.nodes[8].id} 
					>
					  Project 5
					</span>
					<ul role="group">
					<li role="treeitem" 
						tabIndex={this.state.nodes[9].tabIndex}
						className={this.state.nodes[9].focus ? 'focus doc' : 'doc' } 
						ref={this.state.nodes[9].id}	
					  >
						project-5A.docx
					</li>
					<li role="treeitem" 
						tabIndex={this.state.nodes[10].tabIndex}
						className={this.state.nodes[10].focus ? 'focus doc' : 'doc' } 
						ref={this.state.nodes[10].id}	
					  >
						project-5B.docx
					  </li>
					</ul>
				  </li>
				</ul>
			  </li>
			</ul>{/* end of main list */}
		  </div>

		);
	}
}



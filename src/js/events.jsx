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
				//@todo this should only move to child element if it is visable
				//remove focus from last element
				this.state.nodes[this.state.tid].tabIndex = -1;
				this.refs[this.state.tid].blur()
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
			case 'ArrowUp':
				//@todo this should only move to child element if it is visable
				//remove focus from last element
				this.state.nodes[this.state.tid].tabIndex = -1;
				this.refs[this.state.tid].blur();
				//update current target id
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
					ref={this.state.nodes[0].id}
					onClick={(e) => this.onClickEvent(e)}
					onFocus={ (e) => this.onFocusEvent(e) }
					onBlur={ (e) => this.onBlurEvent(e) }
					onKeyDown={(e) => this.onKeyPressedEvent(e)}
				>
					<span 
						className={this.state.nodes[0].focus ? 'focus' : ''} 
						id={'span'+this.state.nodes[0].id} 
					>
						Projects
					</span>
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
					<span>
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
			</ul>
		  </div>

		);
	}
}



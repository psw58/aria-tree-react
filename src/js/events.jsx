import React, { Component } from 'react';
import ReactDOM from 'react';
//import KeyboardEventHandler from 'react-keyboard-event-handler';

var nodes = [
	{id:0, name:'root', parent:'', visable: true, expanded:false, focus:false, groups:[1,2,3,7,8], tabIndex:0 },
	{id:1, name:'', parent:0, visable: false, focus:false, tabIndex:-1 },
	{id:2, name:'', parent:0, visable: false, focus:false, tabIndex:-1 },
	{id:3, name:'', type:'', parent:0, visable: false, isParent:true, expanded:false, focus:false, groups:[4,5,6], tabIndex:-1 },
	{id:4, name:'', parent:3,  visable: false, focus:false, tabIndex:-1 },
	{id:5, name:'', parent:3,  visable: false, focus:false, tabIndex:-1 },
	{id:6, name:'', parent:3, visable: false,  focus:false, tabIndex:-1 },
	{id:7, name:'', parent:0, visable: false, focus:false, tabIndex:-1 },
	{id:8, name:'', type:'', parent:0, visable: false, isParent:true, expanded:false, focus:false, groups:[9,10], tabIndex:-1 },
	{id:9, name:'', parent:9, visable: false, focus:false, tabIndex:-1 },
	{id:10, name:'', type:'child', parent:10, visable: false, focus:false, tabIndex:-1 },	
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
	  }  

	onClickEvent( event ){
		//@TODO if this element does not have focus give it focus
		const oldID = this.state.tid;
		//get the id of the element from the data set
		if ( event.target.dataset.id ){
			this.state.tid = parseInt(event.target.dataset.id);
		}else{
			console.log('error no data id')
		}
		//clicked a childs span element not a node
		if (event.target.id == "span"+this.state.tid){
			this.state.nodes[this.state.tid].expanded = !this.state.nodes[this.state.tid].expanded;
		}
		this.setNodeVisibleState(this.state.tid)
		this.setState({nodes: this.state.nodes});
		this.moveFocus(oldID, this.state.tid)
	}

	setNodeVisibleState(stateID){
		const myID = stateID;
		if ('groups' in this.state.nodes[myID]){
			this.state.nodes[myID].groups.forEach(element => {
				//if it has a child node set visible to false
				if (this.state.nodes[element].groups){
					console.log("setting id " + this.state.nodes[element].id + " children to unsearchable");
					this.state.nodes[element].groups.forEach(el => {
						this.state.nodes[el].visable = false;
					})
				}				
				if(this.state.nodes[myID].expanded){
					//visable is true
					this.state.nodes[element].visable = true;
					//if the node is expanded set the children to visible
					if (this.state.nodes[element].groups && this.state.nodes[element].expanded){
						console.log("setting id " + this.state.nodes[element].id + " children to searchable");
						this.state.nodes[element].groups.forEach(el => {
							this.state.nodes[el].visable = true;
						})
					}								
				}else{
					//visivle is false
					this.state.nodes[element].visable = false;
				}
			});
		}else{
			console.log('no groups');
		}
	}

	moveFocus(curID, nextID){
		//remove focus from old element 
		this.state.nodes[curID].focus = false;
		this.state.nodes[curID].tabIndex = -1;
		//set focus to current elem
		this.state.nodes[nextID].focus = true;
		this.state.nodes[nextID].tabIndex = 0;
		this.setState({nodes: this.state.nodes});
		this.refs[nextID].focus();
	}

	onFocusEvent(e){
		this.state.nodes[this.state.tid].focus = true;
		this.state.nodes[this.state.tid].tabIndex = 0;
		this.setState({nodes: this.state.nodes});
	}

	onBlurEvent(e){
		this.state.nodes[this.state.tid].focus = false;
		this.setState({nodes: this.state.nodes});
	}

	findVisableInReverse( searchStart ){
		var id = this.state.tid;
		//find closest visable item
		for (var i = searchStart; i >= 0; --i){
			if (this.state.nodes[i].visable == true){
				id = i;
				break; 
			}
		}	
		
		return id;

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
					this.state.nodes[this.state.tid].expanded = !this.state.nodes[this.state.tid].expanded;
					this.setNodeVisibleState(this.state.tid)
				}else{
					//element can not expand ignore enter key
					console.log('element can not expand');
				}
				break;
			/* Down Arrow: 
				Moves focus to the next node that is focusable without opening or closing a node.
			*/
			case 'ArrowDown':
				//save id to remove focus from last element
				var oldID = this.state.tid;
				if (this.state.nodes.length > this.state.tid+1){
					//find closest visable item
					for (var i=this.state.tid+1; i<this.state.nodes.length; i++){
						var elem = this.state.nodes[i];
						if ( ('visable' in elem) && (elem.visable == true)){
							this.state.tid = i;
							break;
						}else if ( i == this.state.nodes.length-1){
							//no loops are found
							console.log('no visable element found return to root');
							this.state.tid = 0
						}else{
							console.log('error no visable elem');
						}	
					}	
				}else{
					//your on last node loop back to begining node
					console.log("beggining of nodes looping to root");
					this.state.tid = 0
				}
				
				//set focus to this element		
				this.moveFocus(oldID, this.state.tid);

				break;
			/* Up Arrow: 
				Moves focus to the previous node that is focusable without opening or closing a node.
			*/
			case 'ArrowUp':
				//save id to remove focus from last element
				var oldID = this.state.tid;
				//update current target id
				//@TOD0 UPDATE THE TARGET ONLY IF ITS VISABLE
				if (this.state.tid > 0){
					//find closest visable item to current node
					this.state.tid = this.findVisableInReverse( this.state.tid-1 );
				}else{
					//loop back to begining node
					console.log("beggining of nodes looping to botttom");
					this.state.tid = this.findVisableInReverse( this.state.nodes.length-1 );				
				}
				this.moveFocus(oldID, this.state.tid);
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
				var oldID = this.state.tid;
				this.state.tid = 0;
				this.moveFocus(oldID, this.state.tid);
				console.log('not implimented');
				break;	
			/* End: 
				Moves focus to the last node in the tree that is focusable without opening a node.
			*/
			case 'End':	
				console.log('not implimented');
				var oldID = this.state.tid;
				this.state.tid = this.findVisableInReverse( this.state.nodes.length-1 );
				this.moveFocus(oldID, this.state.tid);
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
					data-visable = {this.state.nodes[0].visable} 
					data-id={this.state.nodes[0].id}
				>
					<span 
						className={this.state.nodes[0].focus ? 'focus' : ''} 
						id={'span'+this.state.nodes[0].id} 
						data-id={this.state.nodes[0].id}
					>
						Projects
					</span>
				{/* this group is controlled by root */}
				<ul role="group">
				  <li role="treeitem" 
					  tabIndex={this.state.nodes[1].tabIndex}
					  className={this.state.nodes[1].focus ? 'focus doc' : 'doc' } 
					  ref={this.state.nodes[1].id}
					  data-visable = {this.state.nodes[1].visable} 
					  data-id={this.state.nodes[1].id}
				>
					project-1.docx
				  </li>
				  <li role="treeitem" 
					  tabIndex={this.state.nodes[2].tabIndex}
					  className={this.state.nodes[2].focus ? 'focus doc' : 'doc' } 
					  ref={this.state.nodes[2].id}
					  data-visable = {this.state.nodes[2].visable} 
					  data-id={this.state.nodes[2].id}
				>
					project-2.docx
				  </li>
				  <li role="treeitem" 
						aria-expanded={this.state.nodes[3].expanded} 
						tabIndex={this.state.nodes[3].tabIndex}  
						ref={this.state.nodes[3].id}
						data-visable = {this.state.nodes[3].visable} 
						data-id={this.state.nodes[3].id}
				  >
					<span
						className={this.state.nodes[3].focus ? 'focus' : ''} 
						id={'span'+this.state.nodes[3].id} 
						data-id={this.state.nodes[3].id}
					>
					  Project 3
					</span>
					<ul role="group">
					  <li role="treeitem" 
						tabIndex={this.state.nodes[4].tabIndex}
						className={this.state.nodes[4].focus ? 'focus doc' : 'doc' } 
						ref={this.state.nodes[4].id}
						data-visable = {this.state.nodes[4].visable} 	
						data-id={this.state.nodes[4].id}		  
					  >
						project-3A.docx
					  </li>
					  <li role="treeitem" 
						tabIndex={this.state.nodes[5].tabIndex}
						className={this.state.nodes[5].focus ? 'focus doc' : 'doc' } 
						ref={this.state.nodes[5].id}
						data-visable = {this.state.nodes[5].visable} 
						data-id={this.state.nodes[5].id}	
						>
						project-3B.docx
					  </li>
					  <li role="treeitem" 
						tabIndex={this.state.nodes[6].tabIndex}
						className={this.state.nodes[6].focus ? 'focus doc' : 'doc' } 
						ref={this.state.nodes[6].id}	
						data-visable = {this.state.nodes[6].visable} 
						data-id={this.state.nodes[6].id}
					  >
						project-3C.docx
					  </li>
					</ul>
				  </li>
				  <li role="treeitem" 
						tabIndex={this.state.nodes[7].tabIndex}
						className={this.state.nodes[7].focus ? 'focus doc' : 'doc' } 
						ref={this.state.nodes[7].id}	
						data-visable = {this.state.nodes[7].visable} 
						data-id={this.state.nodes[7].id}
					  >
					project-4.docx
				  </li>
				  <li role="treeitem" 
						aria-expanded={this.state.nodes[8].expanded} 
						tabIndex={this.state.nodes[8].tabIndex}  
						ref={this.state.nodes[8].id}
						data-visable = {this.state.nodes[8].visable} 
						data-id={this.state.nodes[8].id}
				  >
					<span
						className={this.state.nodes[8].focus ? 'focus' : ''} 
						id={'span'+this.state.nodes[8].id} 
						data-id={this.state.nodes[8].id}
					>
					  Project 5
					</span>
					<ul role="group">
					<li role="treeitem" 
						tabIndex={this.state.nodes[9].tabIndex}
						className={this.state.nodes[9].focus ? 'focus doc' : 'doc' } 
						ref={this.state.nodes[9].id}
						data-visable = {this.state.nodes[9].visable} 	
						data-id={this.state.nodes[9].id}
					  >
						project-5A.docx
					</li>
					<li role="treeitem" 
						tabIndex={this.state.nodes[10].tabIndex}
						className={this.state.nodes[10].focus ? 'focus doc' : 'doc' } 
						ref={this.state.nodes[10].id}	
						data-visable = {this.state.nodes[10].visable} 
						data-id={this.state.nodes[10].id}
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



/* old arrow down
//if the element is a expanded list move to next child elemnt in sub list
if (this.state.nodes[this.state.tid].expanded == true){
	console.log('expanded folder moving to next element');
	if (nodes.length > this.state.tid+1){
		this.state.tid += 1;
	}else{
		//loop back to begining node
		console.log("end of nodes looping to top");
		this.state.tid = 0
	}
//else if the element is a child of a expanded folder
}else if( !('expanded'  in this.state.nodes[this.state.tid]) ){
	console.log('file found moving to next element')
	//else its not expanded find next visible node
	if (nodes.length > this.state.tid+1){
		this.state.tid += 1;
	}else{
		//loop back to begining node
		console.log("end of nodes looping to top");
		this.state.tid = 0
	}
//the element is a collapsed folder move to the next visable element
}else if(this.state.nodes[this.state.tid].expanded == false){
	console.log('collapsed folder find next file')
	var val = this.state.nodes[this.state.tid]			
	function sortNumber(a,b) {
		return a - b;
	}

	if ('groups' in val){
		//sort the children in case they arent sorted
		var groups = val.groups.sort(sortNumber);
		//return the last element in the array
		var myTID = groups[groups.length-1];
		console.log( myTID )
		console.log(myTID);
		if (nodes.length > myTID+1){
			console.log(this.state.nodes[myTID]);
			//the last node is a group but it is not visable find its last child node
			if ('groups'  in this.state.nodes[myTID]){
				var val2 = this.state.nodes[myTID];
				var groups2 = val2.groups.sort(sortNumber);
				myTID = groups2[groups2.length-1];

				if (nodes.length > myTID+1){
					console.log('setting tid to '+(myTID + 1))
					this.state.tid =  myTID + 1;
				}else{
					//loop back to begining node
					console.log("end of nodes looping to top");
					this.state.tid = 0
				}								
			}else{
				//it is a list element file move to it
				console.log('found available file list elemet')
				this.state.tid = myTID + 1;;
			}	
		}else{
			//loop back to begining node
			console.log("end of nodes looping to top");
			this.state.tid = 0
		}	
	}else{
		console.log('ERROR in :');
		console.log(val);
	}					
	console.log(val);
	


}else{
	console.log('ERROR no element found')
}
*/
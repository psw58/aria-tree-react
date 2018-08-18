import React, { Component } from 'react';


export class MyButton extends Component {
	btnClickEvent( myId ){
		alert('You clicked me');
		console.log(myId)
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
			<h3 id="tree_label">
			  File Viewer
			</h3>
			<ul role="tree" aria-labelledby="tree_label">
			  <li role="treeitem" aria-expanded="false">
				<span>
				  Projects
				</span>
				<ul role="group">
				  <li role="treeitem" className="doc">
					project-1.docx
				  </li>
				  <li role="treeitem" className="doc">
					project-2.docx
				  </li>
				  <li role="treeitem" aria-expanded="false">
					<span>
					  Project 3
					</span>
					<ul role="group">
					  <li role="treeitem" className="doc">
						project-3A.docx
					  </li>
					  <li role="treeitem" className="doc">
						project-3B.docx
					  </li>
					  <li role="treeitem" className="doc">
						project-3C.docx
					  </li>
					</ul>
				  </li>
				  <li role="treeitem" className="doc">
					project-4.docx
				  </li>
				  <li role="treeitem" aria-expanded="false">
					<span>
					  Project 5
					</span>
					<ul role="group">
					  <li role="treeitem" className="doc">
						project-5A.docx
					  </li>
					  <li role="treeitem" className="doc">
						project-5B.docx
					  </li>
					  <li role="treeitem" className="doc">
						project-5C.docx
					  </li>
					  <li role="treeitem" className="doc">
						project-5D.docx
					  </li>
					  <li role="treeitem" className="doc">
						project-5E.docx
					  </li>
					  <li role="treeitem" className="doc">
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



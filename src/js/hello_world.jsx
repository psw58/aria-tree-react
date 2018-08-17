import React, { Component } from 'react';

//https://reactjs.org/docs/components-and-props.html
//this following class is equivolent to 
/*
function HelloWorld(props) {
	return <div className="hello-world"><h1>Hello World {props.name}</h1></div>;
  }
  */
export class HelloWorld extends Component {
	render() {
		return (
			<div className="hello-world">
				<h1>Hello World {this.props.name}</h1>
			</div>
		);
	}
}

export default HelloWorld;

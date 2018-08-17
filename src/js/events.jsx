import React, { Component } from 'react';


export class MyButton extends Component {
	btnClickEvent( myId ){
		alert('You clicked me');
		console.log(myId)
	}

	render() {
		return (
			<button 
				//need to research what is passed here?
				onClick={(reactEvent) => this.btnClickEvent(reactEvent)}
			>Click Me
			</button>
		);
	}
}



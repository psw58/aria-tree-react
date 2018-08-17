import React from 'react';
import ReactDOM from 'react-dom';

//an example of ajax query using fetch
export class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    //create a state variable that holds the data query
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(`https://www.reddit.com/r/${this.props.subreddit}.json`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data
          });

          console.log( result.data );
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const linksList =  items.children.map( (element, i) => {
          return <li key={i} ><a href={element.data.url} target='_blank'>{element.data.title}</a> </li>;
        });      
        
      return (
        <div>
          <h1>{`https://www.reddit.com/r/${this.props.subreddit}.json`}</h1>
          <ul>
            { linksList }
          </ul>        
        </div>
      );
    }
  }
}


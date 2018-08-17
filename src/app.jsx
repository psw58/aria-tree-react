import React from 'react';
import ReactDOM from 'react-dom';

import HelloWorld from './js/hello_world';
import {MyButton} from './js/events';

import { MyComponent } from './js/service';

//styles
import './css/_cwd_events.scss';

ReactDOM.render(
      <HelloWorld name="test" />,
    document.getElementById('hello_world')
);

ReactDOM.render(
  <MyButton />,
    document.getElementById('events')  
);

ReactDOM.render(
  <MyComponent subreddit="reactjs" />,
  document.getElementById('dynamic')  
);






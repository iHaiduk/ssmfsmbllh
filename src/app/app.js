/**
 * Created by igor on 18.04.2016.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './modules/Header'; // Our custom react component

injectTapEventPlugin(); 

ReactDOM.render(<Main />, document.getElementById('app'));
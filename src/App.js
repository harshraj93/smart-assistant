import React, {Component} from 'react';
import Amplify from 'aws-amplify';
import Aws_exports from './aws-exports';
import './SCSS/main.scss';
import '@aws-amplify/ui/dist/style.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CommandCentre from './Components/CommandCentre/CommandCentre';
import Header from './Components/HeaderComponent/HeaderComponent';
import SamerianModel from './Components/CommandCentre/SumerianModel'

Amplify.configure(Aws_exports);

class App extends Component {
  render() {
    return (
      <Router>
      <div className='app-main'>
        <Header/>
        <div className='content-body'>
        <Route
              exact path='/smart-assistant'
              render={props => <CommandCentre {...props} />}
            />
           <Route
              exact path='/digitalTwin'
              render={props => <SamerianModel {...props} />}
            />
        </div>
      </div>
      </Router>
    );
  }
};

export default App;

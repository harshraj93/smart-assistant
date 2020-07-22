import React, {Component} from 'react';
import { SumerianScene } from 'aws-amplify-react';
import backArrow from '../../img/back-arrow.svg'

class SumerianComponent extends Component {
  render() {
    return (
      <div className='model-container' >
        <img className='back-button' src={backArrow} alt='back' onClick={()=>this.props.history.goBack()}/>
        <SumerianScene sceneName='pump'/>
      </div>
    );
  }
};

export default SumerianComponent;

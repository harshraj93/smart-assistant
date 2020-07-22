import React from 'react';
import DeloitteLogo from './Deloitte_logo.png';
import ZeniLogo from '../../img/zeni.png'

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }
 
  render() {
    return (
      <header className="header">

        <section className="logos">
          <div className="deloitte-icon">
            <img src={DeloitteLogo} alt="DeloitteLogo" className="deloitte" />
          </div>
        </section>

        <section className="title">
          <h1>Zeni Digital Assistant</h1>
        </section>

        <section className="header-rightSection">
        <div className="deloitte-icon">
            <img className='zeni-icon' src={ZeniLogo} alt="ZeniLogo"/>
          </div>
        </section>
      
      </header>
    );
  }
}
export default HeaderComponent;
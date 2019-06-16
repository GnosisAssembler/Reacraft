import React, { Component } from 'react';
import './App.css';

// Import basic images
import goldBlock from './assets/building/minerals/150px-Block_of_Gold.png';
import ironBlock from './assets/building/minerals/150px-Block_of_Iron.png';
import diamondBlock from './assets/building/minerals/150px-Block_of_Diamond.png';
import emeraldBlock from './assets/building/minerals/150px-Block_of_Emerald.png';
import lapisBlock from './assets/building/minerals/150px-Lapis_Lazuli_Block.png';

// Import basic components
import Minerals from './components/building/Minerals';

// Import utils
import { mineralCheckBlock, mineralCheckIngot } from './utils/mineralCheck';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        main: "",
        secondary: "" 
    };
  }

  // onMineral
  onMineral(e) {
    const id = e.target.id; //get id of image clicked

    // Call mineralCheck functions for blocks and ingots
    const mb = mineralCheckBlock(id);
    const mi = mineralCheckIngot(id);
    
    this.setState({
      main: mb,
      secondary:mi 
    });
}
  
  render() {
    return (
      <div className="App">
        <h1>Crafting Guide</h1>

        <div>
          <Minerals mineralMain={this.state.main} mineralSecondary={this.state.secondary}/>
        </div>

        <h3>Building</h3>

        <h5>Minerals</h5>
        <img src={goldBlock} alt="gold-block" width="36px;" onClick={this.onMineral.bind(this)} id="gold"/>
        <img src={ironBlock} alt="iron-block" width="36px;" onClick={this.onMineral.bind(this)} id="iron"/>
        <img src={diamondBlock} alt="diamond-block" width="36px;" onClick={this.onMineral.bind(this)} id="diamond"/>
        <img src={emeraldBlock} alt="emerald-block" width="36px;" onClick={this.onMineral.bind(this)} id="emerald"/>
        <img src={lapisBlock} alt="lapis-block" width="36px;" onClick={this.onMineral.bind(this)} id="lapis"/>
      
      </div>
    );
  }

}

export default App;

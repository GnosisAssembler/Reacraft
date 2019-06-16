import React, { Component } from 'react';
import './App.css';

import goldBlock from './assets/building/minerals/150px-Block_of_Gold.png';
import ironBlock from './assets/building/minerals/150px-Block_of_Iron.png';
import diamondBlock from './assets/building/minerals/150px-Block_of_Diamond.png';
import emeraldBlock from './assets/building/minerals/150px-Block_of_Emerald.png';
import lapisBlock from './assets/building/minerals/150px-Lapis_Lazuli_Block.png';

import Minerals from './components/building/Minerals';
import { mineralCheckBlock, mineralCheckIngot } from './utils/mineralCheck';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        main: "",
        secondary: "" 
    };
  }

  onItem(e) {
    const id = e.target.id;

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

        <h3>Building</h3>

        <h5>Minerals</h5>
        <img src={goldBlock} alt="gold" width="25px;" onClick={this.onItem.bind(this)} id="gold"/>
        <img src={ironBlock} alt="iron" width="25px;" onClick={this.onItem.bind(this)} id="iron"/>
        <img src={diamondBlock} alt="iron" width="25px;" onClick={this.onItem.bind(this)} id="diamond"/>
        <img src={emeraldBlock} alt="iron" width="25px;" onClick={this.onItem.bind(this)} id="emerald"/>
        <img src={lapisBlock} alt="iron" width="25px;" onClick={this.onItem.bind(this)} id="lapis"/>
      
        <Minerals mineralMain={this.state.main} mineralSecondary={this.state.secondary}/>
      </div>
    );
  }

}

export default App;

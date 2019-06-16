import React, { Component } from 'react';
import './App.css';

// Import basic images
import goldBlock from './assets/building/minerals/150px-Block_of_Gold.png';
import ironBlock from './assets/building/minerals/150px-Block_of_Iron.png';
import diamondBlock from './assets/building/minerals/150px-Block_of_Diamond.png';
import emeraldBlock from './assets/building/minerals/150px-Block_of_Emerald.png';
import lapisBlock from './assets/building/minerals/150px-Lapis_Lazuli_Block.png';
import stoneBrickBlock from './assets/building/stone/150px-Stone_Bricks.png';
import mossyStoneBlock from './assets/building/stone/150px-Mossy_Stone_Bricks.png';
import mossyCobbleBlock from './assets/building/stone/150px-Mossy_Cobblestone.png';
import crackedStoneBlock from './assets/building/stone/150px-Cracked_Stone_Bricks.png';
import chiseledStoneBlock from './assets/building/stone/150px-Chiseled_Stone_Bricks.png';

// Import basic components
import Minerals from './components/building/Minerals';

// Import utils
import { mineralCheckBlock, mineralCheckIngot } from './utils/mineralCheck';
import { stoneCheckBlock, stoneCheckMat } from './utils/stoneCheck';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        main: "",
        secondary: "" 
    };
  }

  // onMineral event
  onMineral(e) {
    const id = e.target.id; //get id of image clicked
    // Call mineralCheck functions for blocks and ingots
    const mb = mineralCheckBlock(id);
    const mi = mineralCheckIngot(id);
    // Set state
    this.setState({
      main: mb,
      secondary:mi 
    });
  }

  // onStone event
  onStone(e) {
    const id = e.target.id; //get id of image clicked
    // Call stoneCheck functions for blocks and mats
    const sb = stoneCheckBlock(id);
    const sm = stoneCheckMat(id);
    // Set state
    this.setState({
      main: sb,
      secondary:sm 
    });
  }
  
  render() {
    return (
      <div className="App">
        <h1>Crafting Guide</h1>

        <div>
          <Minerals mineralMain={this.state.main} mineralSecondary={this.state.secondary}/>
        </div>

        <h2>Building</h2>

        <h3>Minerals</h3>
        <img src={goldBlock} alt="gold-block" width="36px;" onClick={this.onMineral.bind(this)} id="gold"/>
        <img src={ironBlock} alt="iron-block" width="36px;" onClick={this.onMineral.bind(this)} id="iron"/>
        <img src={diamondBlock} alt="diamond-block" width="36px;" onClick={this.onMineral.bind(this)} id="diamond"/>
        <img src={emeraldBlock} alt="emerald-block" width="36px;" onClick={this.onMineral.bind(this)} id="emerald"/>
        <img src={lapisBlock} alt="lapis-block" width="36px;" onClick={this.onMineral.bind(this)} id="lapis"/>

        <h3>Stone</h3>
        <img src={stoneBrickBlock} alt="stoneBrick" width="36px;" onClick={this.onStone.bind(this)} id="stoneBrick"/>
        <img src={mossyStoneBlock} alt="mossyStone" width="36px;" onClick={this.onStone.bind(this)} id="mossyStone"/>
        <img src={mossyCobbleBlock} alt="mossyCobble" width="36px;" onClick={this.onStone.bind(this)} id="mossyCobble"/>
        <img src={crackedStoneBlock} alt="crackedStone" width="36px;" onClick={this.onStone.bind(this)} id="crackedStone"/>
        <img src={chiseledStoneBlock} alt="chiseledStone" width="36px;" onClick={this.onStone.bind(this)} id="chiseledStone"/>
      
      </div>
    );
  }

}

export default App;

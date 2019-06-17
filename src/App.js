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
import CraftingTable from './components/common/CraftingTable';

// Import utils
import { mineralCheck } from './utils/mineralCheck';
import { stoneCheck } from './utils/stoneCheck';

class App extends Component {
  constructor(props) {
    super(props);
    // 5 values of state = 5 max combinations of items in the crafting table
    // and 1 for the ouput item
    this.state = { 
        item1: "",
        item2: "",
        item3: "",
        item4: "",
        item5: "",
        result: "" 
    };
  }

  // onMineral event
  onMineral(e) {
    const id = e.target.id; //get id of image clicked
    // Call mineralCheck 
    const check = mineralCheck(id);
    
    // Set state
    this.setState({
      item1: check[0],
      item2: "",
      item3: "",
      item4: "",
      item5: "",
      result: check[1] 
    });
  }

  // onstone event
  onStone(e) {
    const id = e.target.id; //get id of image clicked
    // Call mineralCheck 
    const check = stoneCheck(id);
    const length = stoneCheck(id).length;
    
    // Set state
    this.setState({
      item1: check[0],
      item2: check[1],
      item3: "",
      item4: "",
      item5: "",
      result: check[length-2] // the result is one item before the final, which is the position of the last item
    });
  }
  
  render() {
    return (
      <div className="App">
        <h1>Crafting Guide</h1>

        <div>
          <CraftingTable 
            firstMaterial={this.state.item1}
            secondMaterial={this.state.item2}
            thirdMaterial={this.state.item3}
            fourthMaterial={this.state.item4}
            fifthMaterial={this.state.item5}
            resultMaterial={this.state.result}
          />
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
        <img src={chiseledStoneBlock} alt="chiseledStone" width="36px;" onClick={this.onStone.bind(this)} id="chiseledStone"/>
        <img src={crackedStoneBlock} alt="crackedStone" width="36px;" onClick={this.onStone.bind(this)} id="crackedStone"/>
      
      </div>
    );
  }

}

export default App;

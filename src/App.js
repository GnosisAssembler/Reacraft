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
    // 10 items - 9 for the crafting slots and 1 for the result
    this.state = { 
        item1: "",
        item2: "",
        item3: "",
        item4: "",
        item5: "",
        item6: "",
        item7: "",
        item8: "",
        item9: "",
        result: "" 
    };
  }

  // handleRecipe event
  handleRecipe(e) {
    const id = e.target.id; //get id of image clicked

    // Check for item categories
    if(id.substring(0,1)==="1") {
      // call mineralCheck
      const check = mineralCheck(id)
      // Set state
      this.setState({
        item1: check[0],
        item2: check[1],
        item3: check[2],
        item4: check[3],
        item5: check[4],
        item6: check[5],
        item7: check[6],
        item8: check[7],
        item9: check[8],
        result: check[9] 
      });
    } else if(id.substring(0,1)==="2") {
      // call stoneCheck
      const check = stoneCheck(id)
      // Set state
      this.setState({
        item1: check[0],
        item2: check[1],
        item3: check[2],
        item4: check[3],
        item5: check[4],
        item6: check[5],
        item7: check[6],
        item8: check[7],
        item9: check[8],
        result: check[9] 
      });
    }
    
  }
  
  render() {

    // Check if the state is full and pass it as a prop to CraftingTable
    // for conditional rendering
    let isStateFull = false;
    if (this.state.item1==="") {
      isStateFull = false;
    } else {
      isStateFull = true;
    }

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
            sixthMaterial={this.state.item6}
            seventhMaterial={this.state.item7}
            eighthMaterial={this.state.item8}
            ninthMaterial={this.state.item9}
            resultMaterial={this.state.result}
            isStateFull={isStateFull}
          />
        </div>

        <h2>Building</h2>

        <h3>Minerals</h3>
        {/**Each item has a unique id with the number of its category in front of it */}
        <img src={goldBlock} alt="gold-block" width="36px;" onClick={this.handleRecipe.bind(this)} id="1-gold"/>
        <img src={ironBlock} alt="iron-block" width="36px;" onClick={this.handleRecipe.bind(this)} id="1-iron"/>
        <img src={diamondBlock} alt="diamond-block" width="36px;" onClick={this.handleRecipe.bind(this)} id="1-diamond"/>
        <img src={emeraldBlock} alt="emerald-block" width="36px;" onClick={this.handleRecipe.bind(this)} id="1-emerald"/>
        <img src={lapisBlock} alt="lapis-block" width="36px;" onClick={this.handleRecipe.bind(this)} id="1-lapis"/>

        <h3>Stone</h3>
        <img src={stoneBrickBlock} alt="stoneBrick" width="36px;" onClick={this.handleRecipe.bind(this)} id="2-stoneBrick"/>
        <img src={mossyStoneBlock} alt="mossyStone" width="36px;" onClick={this.handleRecipe.bind(this)} id="2-mossyStone"/>
        <img src={mossyCobbleBlock} alt="mossyCobble" width="36px;" onClick={this.handleRecipe.bind(this)} id="2-mossyCobble"/>
        <img src={chiseledStoneBlock} alt="chiseledStone" width="36px;" onClick={this.handleRecipe.bind(this)} id="2-chiseledStone"/>
        <img src={crackedStoneBlock} alt="crackedStone" width="36px;" onClick={this.handleRecipe.bind(this)} id="2-crackedStone"/>
      
      </div>
    );
  }

}

export default App;
